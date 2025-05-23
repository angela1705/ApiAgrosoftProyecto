# apps/Iot/evapotranspiracion/api/views.py
from rest_framework import viewsets, status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.http import HttpResponse
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.units import inch
from datetime import datetime, timedelta
from django.db.models import Max, Min
import logging
import os

from apps.Iot.evapotranspiracion.models import Evapotranspiracion
from apps.Iot.evapotranspiracion.api.serializers import EvapotranspiracionSerializer
from apps.Iot.evapotranspiracion.utils import calcular_evapotranspiracion_diaria
from apps.Iot.datos_meteorologicos.models import Datos_metereologicos

logger = logging.getLogger(__name__)

class EvapotranspiracionViewSet(viewsets.ModelViewSet):
    queryset = Evapotranspiracion.objects.all()
    serializer_class = EvapotranspiracionSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["fk_bancal", "fecha"]

    @action(detail=False, methods=["post"], url_path="calcular", url_name="calcular")
    def calcular(self, request):
        """
        POST /api/iot/evapotranspiracion/calcular/
        body: { fk_bancal_id, fecha: 'YYYY-MM-DD', latitud? }
        """
        bancal_id = request.data.get("fk_bancal_id")
        if not bancal_id:
            logger.error("fk_bancal_id no proporcionado")
            return Response({"error": "fk_bancal_id es requerido"}, status=status.HTTP_400_BAD_REQUEST)
        
        fecha = request.data.get("fecha")
        if not fecha:
            logger.error("fecha no proporcionada")
            return Response({"error": "fecha es requerida"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            fecha_dt = datetime.fromisoformat(fecha).date()
        except Exception as e:
            logger.error(f"Formato de fecha inválido: {fecha}, error: {str(e)}")
            return Response(
                {"error": "Formato de fecha inválido. Use YYYY-MM-DD."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        latitud = float(request.data.get("latitud", 0))
        
        ETo = calcular_evapotranspiracion_diaria(bancal_id, fecha_dt, latitud)
        if ETo is None:
            datos = Datos_metereologicos.objects.filter(
                fk_bancal_id=bancal_id,
                fecha_medicion__gte=datetime.combine(fecha_dt, datetime.min.time()),
                fecha_medicion__lt=datetime.combine(fecha_dt, datetime.min.time()) + timedelta(days=1)
            ).aggregate(
                t_max=Max("temperatura"),
                t_min=Min("temperatura")
            )
            missing_fields = []
            if datos["t_max"] is None:
                missing_fields.append("t_max")
            if datos["t_min"] is None:
                missing_fields.append("t_min")
            error_message = (
                f"No hay datos suficientes para calcular la evapotranspiración. Campos faltantes: {missing_fields}"
                if missing_fields
                else "Error en el cálculo de evapotranspiración. Revise los datos meteorológicos."
            )
            logger.warning(f"Datos insuficientes para bancal_id={bancal_id}, fecha={fecha_dt}, mensaje: {error_message}")
            return Response(
                {"error": error_message},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            evap, created = Evapotranspiracion.objects.update_or_create(
                fk_bancal_id=bancal_id,
                fecha=fecha_dt,
                defaults={"valor": ETo}
            )
            serializer = self.get_serializer(evap)
            logger.info(f"Evapotranspiración guardada para bancal_id={bancal_id}, fecha={fecha_dt}: {ETo}")
            return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error al guardar evapotranspiración: {str(e)}")
            return Response(
                {"error": f"Error al guardar los datos: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['get'], url_path='reporte_pdf')
    def reporte_pdf(self, request):
        """
        GET /api/iot/evapotranspiracion/reporte_pdf/?fecha_inicio=YYYY-MM-DD&fecha_fin=YYYY-MM-DD
        Genera un reporte PDF con los datos de evapotranspiración.
        """
        try:
            logger.info("Ejecutando reporte_pdf de evapotranspiración")
            response = HttpResponse(content_type='application/pdf')
            response['Content-Disposition'] = 'attachment; filename="reporte_evapotranspiracion.pdf"'

            doc = SimpleDocTemplate(response, pagesize=letter)
            elementos = []
            styles = getSampleStyleSheet()

            logo_path = "media/logo/def_AGROSIS_LOGOTIC.png"
            if not os.path.exists(logo_path):
                logger.error(f"Logo no encontrado en {logo_path}")
                return Response({"error": "Logo no encontrado"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            logo = Image(logo_path, width=50, height=35)
            encabezado_data = [
                [logo, Paragraph("<b>Agrosoft</b><br/>Reporte de Evapotranspiración", styles['Normal']), ""],
                ["", Paragraph(f"Fecha: {datetime.today().strftime('%Y-%m-%d')}", styles['Normal']), "Página 1"],
            ]

            tabla_encabezado = Table(encabezado_data, colWidths=[60, 350, 100])
            tabla_encabezado.setStyle(TableStyle([
                ('SPAN', (0, 0), (0, 1)),
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
                ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ]))
            elementos.append(tabla_encabezado)
            elementos.append(Spacer(1, 10))

            elementos.append(Paragraph("<b>1. Objetivo</b>", styles['Heading2']))
            elementos.append(Paragraph(
                "Este documento detalla los cálculos de evapotranspiración registrados en el sistema, "
                "para optimizar la gestión del riego en cultivos.",
                styles['Normal']
            ))
            elementos.append(Spacer(1, 15))

            elementos.append(Paragraph("<b>2. Registro de Evapotranspiración</b>", styles['Heading2']))
            elementos.append(Spacer(1, 5))

            queryset = self.get_queryset()
            fecha_inicio = request.query_params.get('fecha_inicio', None)
            fecha_fin = request.query_params.get('fecha_fin', None)
            if fecha_inicio and fecha_fin:
                try:
                    logger.info(f"Filtrando por rango de fechas: {fecha_inicio} a {fecha_fin}")
                    fecha_inicio_dt = datetime.strptime(fecha_inicio, '%Y-%m-%d')
                    fecha_fin_dt = datetime.strptime(fecha_fin, '%Y-%m-%d') + timedelta(days=1)
                    queryset = queryset.filter(
                        fecha__gte=fecha_inicio_dt,
                        fecha__lt=fecha_fin_dt
                    )
                    logger.info(f"Registros después de filtrar por fechas: {queryset.count()}")
                except ValueError as e:
                    logger.error(f"Formato de fecha inválido: {fecha_inicio} o {fecha_fin}, error: {str(e)}")
                    pass

            datos = queryset
            total_datos = datos.count()
            logger.info(f"Total de datos para el reporte: {total_datos}")

            data_datos = [
                ["ID", "Bancal", "Fecha", "Valor (mm/día)", "Creado"]
            ]
            for dato in datos:
                try:
                    fecha = dato.fecha.strftime('%Y-%m-%d') if dato.fecha else "N/A"
                    bancal_nombre = dato.fk_bancal.nombre if dato.fk_bancal and hasattr(dato.fk_bancal, 'nombre') else "N/A"
                    creado = dato.creado.strftime('%Y-%m-%d %H:%M') if dato.creado else "N/A"
                    data_datos.append([
                        str(dato.id),
                        bancal_nombre,
                        fecha,
                        str(dato.valor) if dato.valor is not None else "N/A",
                        creado
                    ])
                except Exception as e:
                    logger.error(f"Error al procesar dato {dato.id}: {str(e)}")
                    continue

            tabla_datos = Table(data_datos, colWidths=[30, 80, 60, 50, 80])
            tabla_datos.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.black),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, -1), 7),
                ('GRID', (0, 0), (-1, -1), 1, colors.black),
                ('VALIGN', (0, 1), (-1, -1), 'MIDDLE'),
                ('WORDWRAP', (0, 0), (-1, -1), 'CJK'),
            ]))
            elementos.append(tabla_datos)
            elementos.append(Spacer(1, 15))

            elementos.append(Paragraph("<b>3. Resumen General</b>", styles['Heading2']))
            resumen_texto = f"""
            Se registraron {total_datos} cálculos de evapotranspiración en el sistema.
            """
            elementos.append(Paragraph(resumen_texto, styles['Normal']))

            doc.build(elementos)
            return response
        except Exception as e:
            logger.error(f"Error en reporte_pdf: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)