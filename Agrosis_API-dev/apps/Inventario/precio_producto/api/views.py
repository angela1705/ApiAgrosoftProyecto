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
from ..models import PrecioProducto
from .serializers import PrecioProductoSerializer

class PrecioProductoViewSet(ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    queryset = PrecioProducto.objects.all()
    serializer_class = PrecioProductoSerializer

    @action(detail=False, methods=['get'])
    def reporte_pdf(self, request):
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="reporte_precios_productos.pdf"'

        doc = SimpleDocTemplate(response, pagesize=letter)
        elementos = []
        styles = getSampleStyleSheet()

        logo_path = "media/logo/def_AGROSIS_LOGOTIC.png"
        logo = Image(logo_path, width=50, height=35)
        encabezado_data = [
            [logo, Paragraph("<b>Empresa XYZ</b><br/>Reporte de Precios de Productos", styles['Normal']), ""],
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
            "Este documento detalla los precios de productos registrados en el sistema, facilitando su gestión y control.",
            styles['Normal'])
        )
        elementos.append(Spacer(1, 15))

        elementos.append(Paragraph("<b>2. Registro de Precios de Productos</b>", styles['Heading2']))
        elementos.append(Spacer(1, 5))

        precios = PrecioProducto.objects.all()
        total_precios = precios.count()
        suma_precios = sum(precio.precio for precio in precios)

        data_precios = [
            ["ID", "Producto", "Unidad (g)", "Precio", "Fecha Registro"]
        ]
        for precio in precios:
            fecha_registro = precio.fecha_registro.strftime('%Y-%m-%d')
            data_precios.append([
                str(precio.id),
                str(precio.producto),
                str(precio.unidad_medida_gramos),
                str(precio.precio),
                fecha_registro
            ])

        tabla_precios = Table(data_precios, colWidths=[30, 200, 60, 60, 80])
        tabla_precios.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.black),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('FONTSIZE', (0, 0), (-1, -1), 7),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('VALIGN', (0, 1), (-1, -1), 'MIDDLE'),
            ('WORDWRAP', (0, 0), (-1, -1), 'CJK'),
        ]))
        elementos.append(tabla_precios)
        elementos.append(Spacer(1, 15))

        elementos.append(Paragraph("<b>3. Resumen General</b>", styles['Heading2']))
        resumen_texto = f"""
        Se registraron {total_precios} precios de productos en el sistema,
        con un total acumulado de {suma_precios} en precios.
        """
        elementos.append(Paragraph(resumen_texto, styles['Normal']))

        doc.build(elementos)
        return response