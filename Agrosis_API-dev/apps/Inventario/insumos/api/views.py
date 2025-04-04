from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.units import inch
from datetime import datetime
from ..models import Insumo
from .serializers import InsumoSerializer

class InsumoViewSet(ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = Insumo.objects.all()
    serializer_class = InsumoSerializer

    @action(detail=False, methods=['get'])
    def reporte_pdf(self, request):
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="reporte_insumos.pdf"'

        doc = SimpleDocTemplate(response, pagesize=letter)
        elementos = []
        styles = getSampleStyleSheet()

        
        logo_path = "media/logo/def_AGROSIS_LOGOTIC.png"  
        logo = Image(logo_path, width=50, height=35)
        encabezado_data = [
            [logo, Paragraph("<b>Empresa XYZ</b><br/>Reporte de Insumos", styles['Normal']), ""],
            ["", Paragraph(f"Fecha: {datetime.today().strftime('%Y-%m-%d')}", styles['Normal']), "Página 1 de 1"],
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
            "Este documento detalla los insumos registrados en el sistema, facilitando su gestión y permitiendo un control eficiente sobre los recursos disponibles.",
            styles['Normal'])
        )
        elementos.append(Spacer(1, 15))

        
        elementos.append(Paragraph("<b>2. Inventario de Insumos</b>", styles['Heading2']))
        elementos.append(Spacer(1, 5))

        
        insumos = Insumo.objects.all()
        total_insumos = insumos.count()
        cantidad_total = sum(insumo.cantidad for insumo in insumos)

        
        data_insumos = [["ID", "Nombre", "Cantidad", "Unidad de Medida", "Fecha de Caducidad", "Activo"]]
        for insumo in insumos:
            fecha_caducidad = insumo.fecha_caducidad.strftime('%Y-%m-%d') if insumo.fecha_caducidad else "N/A"
            data_insumos.append([
                insumo.id,
                insumo.nombre,
                insumo.cantidad,
                insumo.unidad_medida,
                fecha_caducidad,
                "Sí" if insumo.activo else "No"
            ])

        
        tabla_insumos = Table(data_insumos)
        tabla_insumos.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.black),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ]))
        elementos.append(tabla_insumos)
        elementos.append(Spacer(1, 15))

        
        elementos.append(Paragraph("<b>3. Resumen General</b>", styles['Heading2']))
        resumen_texto = f"""
        Se registraron {total_insumos} insumos en el sistema,
        con un total acumulado de {cantidad_total} unidades.
        """
        elementos.append(Paragraph(resumen_texto, styles['Normal']))

        
        doc.build(elementos)
        return response