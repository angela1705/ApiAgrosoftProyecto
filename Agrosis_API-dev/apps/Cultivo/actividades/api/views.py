from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from apps.Cultivo.actividades.models import Actividad
from apps.Cultivo.actividades.api.serializers import ActividadSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead , PermisoPorRol
from rest_framework.decorators import action
from django.http import HttpResponse
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.units import inch
from datetime import datetime
import os
from django.conf import settings
from apps.Cultivo.actividades.models import Actividad, PrestamoHerramienta, PrestamoInsumo
from rest_framework.response import Response
from rest_framework import status  
from apps.Cultivo.actividades.api.serializers import FinalizarActividadSerializer
from django.db.models import F, Prefetch
from apps.Finanzas.salario.models import Salario
from decimal import Decimal  

class ActividadViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrRead, PermisoPorRol] 
    serializer_class = ActividadSerializer
    
    @action(detail=True, methods=['post'])
    def finalizar(self, request, pk=None):
        actividad = self.get_object()
        
        if actividad.estado == 'COMPLETADA':
            return Response(
                {"error": "Esta actividad ya está completada"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = FinalizarActividadSerializer(actividad, data=request.data)
        if serializer.is_valid():
            actividad = serializer.save()
            
            actividad.prestamos_insumos.all().update(
                cantidad_devuelta=F('cantidad_usada'),
                fecha_devolucion=actividad.fecha_fin
            )
            
            actividad.prestamos_herramientas.all().update(
                devuelta=True,
                fecha_devolucion=actividad.fecha_fin
            )
            
            return Response({
                "message": "Actividad finalizada correctamente",
                "insumos_devueltos": actividad.prestamos_insumos.count(),
                "herramientas_devueltas": actividad.prestamos_herramientas.count()
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get_queryset(self):
        queryset = Actividad.objects.all()
        
        if self.action == 'reporte_pdf':
            queryset = queryset.filter(estado='COMPLETADA')
        
        elif self.action == 'grafico_costos':
            queryset = queryset.select_related('tipo_actividad', 'cultivo').prefetch_related(
                Prefetch('prestamos_insumos', queryset=PrestamoInsumo.objects.select_related('insumo')),
                Prefetch('prestamos_herramientas', queryset=PrestamoHerramienta.objects.select_related('herramienta'))
            )
        
        return queryset.order_by('-fecha_fin')
    
    @action(detail=False, methods=['get'])
    def reporte_pdf(self, request):
        actividades = self.get_queryset()
        
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="reporte_actividades.pdf"'

        doc = SimpleDocTemplate(response, pagesize=letter)
        elementos = []

        styles = getSampleStyleSheet()
        
        logo_path = os.path.join(settings.MEDIA_ROOT, 'logo', 'def_AGROSIS_LOGOTIC.png')
        logo = Image(logo_path, width=50, height=35) if os.path.exists(logo_path) else None

        encabezado_data = [
            [logo, Paragraph("<b>Centro de gestión y desarrollo sostenible surcolombiano<br/>SENA - YAMBORÓ</b>", styles['Normal']), ""],
            ["", Paragraph("<b>Reporte de Actividades Completadas</b>", styles['Heading2']), Paragraph(f"Generado: {datetime.today().strftime('%Y-%m-%d %H:%M')}", styles['Normal'])],
            ["", "", Paragraph("Página 1 de 1", styles['Normal'])],
        ]

        tabla_encabezado = Table(encabezado_data, colWidths=[60, 350, 100])
        tabla_encabezado.setStyle(TableStyle([
            ('SPAN', (0, 0), (0, 2)), 
            ('SPAN', (1, 0), (1, 1)), 
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ]))
        elementos.append(tabla_encabezado)
        elementos.append(Spacer(1, 20))

        elementos.append(Paragraph("<b>1. Objetivo</b>", styles['Heading2']))
        objetivo_texto = """
        Este documento presenta un reporte detallado de las actividades COMPLETADAS en los cultivos,
        incluyendo información sobre insumos utilizados, fechas de ejecución y responsables.
        """
        elementos.append(Paragraph(objetivo_texto, styles['Normal']))
        elementos.append(Spacer(1, 15))

        elementos.append(Paragraph("<b>2. Resumen General</b>", styles['Heading2']))
        
        if actividades.exists():
            primera_actividad = actividades.earliest('fecha_inicio')
            ultima_actividad = actividades.latest('fecha_fin')
            periodo = f"{primera_actividad.fecha_inicio.strftime('%Y-%m-%d')} al {ultima_actividad.fecha_fin.strftime('%Y-%m-%d')}"
        else:
            periodo = "No hay datos disponibles"

        resumen_texto = f"""
        Total actividades completadas: {actividades.count()}<br/>
        Período cubierto: {periodo}<br/>
        Insumos utilizados: {len(set(a.insumo.id for a in actividades))} diferentes<br/>
        """
        elementos.append(Paragraph(resumen_texto, styles['Normal']))
        elementos.append(Spacer(1, 20))

        elementos.append(Paragraph("<b>3. Detalle de Actividades</b>", styles['Heading2']))
        
        data_actividades = [
            ["Tipo", "Descripción", "Fechas", "Prioridad", "Cultivo", "Insumo", "Cantidad"]
        ]
        
        for actividad in actividades:
            data_actividades.append([
                str(actividad.tipo_actividad),
                actividad.descripcion[:50] + "..." if len(actividad.descripcion) > 50 else actividad.descripcion,
                f"{actividad.fecha_inicio.strftime('%Y-%m-%d')} a {actividad.fecha_fin.strftime('%Y-%m-%d')}",
                actividad.prioridad,
                str(actividad.cultivo),
                str(actividad.insumo),
                str(actividad.cantidadUsada)
            ])

        tabla_actividades = Table(data_actividades, colWidths=[80, 100, 80, 60, 80, 80, 60])
        tabla_actividades.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.black),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, 0), 9),
            ('FONTSIZE', (0, 1), (-1, -1), 8),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.lightgrey),
            ('BOX', (0, 0), (-1, -1), 1, colors.black),
        ]))
        elementos.append(tabla_actividades)
        elementos.append(Spacer(1, 20))

        elementos.append(Paragraph("<b>4. Información Adicional</b>", styles['Heading2']))
        
        for actividad in actividades:
            elementos.append(Paragraph(f"<b>Actividad: {actividad.tipo_actividad}</b>", styles['Heading3']))
            
            info_actividad = f"""
            <b>Cultivo:</b> {actividad.cultivo}<br/>
            <b>Estado:</b> {actividad.estado}<br/>
            <b>Período:</b> {actividad.fecha_inicio.strftime('%Y-%m-%d')} a {actividad.fecha_fin.strftime('%Y-%m-%d')}<br/>
            <b>Responsable:</b> {actividad.usuario}<br/>
            <b>Insumos:</b> {actividad.insumo} - Cantidad: {actividad.cantidadUsada}<br/>
            """
            elementos.append(Paragraph(info_actividad, styles['Normal']))
            elementos.append(Spacer(1, 10))

        doc.build(elementos)
        return response
    
    @action(detail=False, methods=['get'])
    def grafico_costos(self, request):
        fecha_inicio = request.query_params.get('fecha_inicio')
        fecha_fin = request.query_params.get('fecha_fin')
        tipo_grafico = request.query_params.get('tipo_grafico', 'barra')
        
        queryset = Actividad.objects.all()
        
        if fecha_inicio and fecha_fin:
            queryset = queryset.filter(
                fecha_inicio__gte=fecha_inicio,
                fecha_fin__lte=fecha_fin
            )
        
        data = []
        for actividad in queryset:
            # Calcular costos de insumos y herramientas usando Decimal
            costo_insumos = sum(
                Decimal(prestamo.insumo.precio_insumo) * Decimal(prestamo.cantidad_usada) 
                for prestamo in actividad.prestamos_insumos.all()
            )
            
            costo_herramientas = sum(
                Decimal(prestamo.herramienta.precio) * Decimal(prestamo.cantidad_entregada)
                for prestamo in actividad.prestamos_herramientas.all()
            )
            
            tiempo_invertido_horas = (actividad.fecha_fin - actividad.fecha_inicio).total_seconds() / 3600
            
            # Calcular costo de mano de obra
            costo_mano_obra = Decimal(0)
            usuarios = actividad.usuarios.all()
            for usuario in usuarios:
                if usuario.rol:
                    salario = Salario.objects.filter(
                        rol=usuario.rol,
                        activo=True,
                        fecha_de_implementacion__lte=actividad.fecha_fin
                    ).order_by('-fecha_de_implementacion').first()
                    
                    if salario:
                        horas_por_jornal = Decimal(8)
                        costo_hora = Decimal(salario.valorJornal) / horas_por_jornal
                        costo_mano_obra += Decimal(tiempo_invertido_horas) * costo_hora
            
            # ✅ Aquí ya todas las variables son Decimal
            total = costo_insumos + costo_herramientas + costo_mano_obra
            
            data.append({
                'actividad': actividad.tipo_actividad.nombre,
                'costo_total': float(total),
                'desglose': {
                    'insumos': float(costo_insumos),
                    'herramientas': float(costo_herramientas),
                    'mano_de_obra': float(costo_mano_obra)
                },
                'tiempo_invertido_horas': round(tiempo_invertido_horas, 2),
                'fecha_inicio': actividad.fecha_inicio.strftime('%Y-%m-%d'),
                'fecha_fin': actividad.fecha_fin.strftime('%Y-%m-%d'),
                'usuarios': [usuario.nombre for usuario in usuarios]
            })
        
        return Response({
            'tipo_grafico': tipo_grafico,
            'periodo': {
                'fecha_inicio': fecha_inicio,
                'fecha_fin': fecha_fin
            },
            'data': data
        })