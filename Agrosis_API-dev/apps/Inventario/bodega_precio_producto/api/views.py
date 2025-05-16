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
from apps.Usuarios.usuarios.api.permissions import PermisoPorRol
from ..models import BodegaPrecioProducto
from .serializers import BodegaPrecioProductoSerializer

class BodegaPrecioProductoViewSet(ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, PermisoPorRol]
    queryset = BodegaPrecioProducto.objects.all()
    serializer_class = BodegaPrecioProductoSerializer

    def perform_create(self, serializer):
        serializer.save(creador=self.request.user)

    def perform_update(self, serializer):
        serializer.save(creador=self.request.user)

    @action(detail=False, methods=['get'])
    def reporte_pdf(self, request):
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="reporte_bodega_precios_productos.pdf"'

        doc = SimpleDocTemplate(response, pagesize=letter)
        elementos = []
        styles = getSampleStyleSheet()

        logo_path = "media/logo/def_AGROSIS_LOGOTIC.png"
        logo = Image(logo_path, width=50, height=35)
        encabezado_data = [
            [logo, Paragraph("<b>Empresa XYZ</b><br/>Reporte de Precios de Productos en Bodega", styles['Normal']), ""],
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
            "Este documento detalla los precios de los productos almacenados en las bodegas, facilitando su control y gestión.",
            styles['Normal'])
        )
        elementos.append(Spacer(1, 15))

        elementos.append(Paragraph("<b>2. Inventario de Precios de Productos</b>", styles['Heading2']))
        elementos.append(Spacer(1, 5))

        bodega_precios = BodegaPrecioProducto.objects.all()
        total_registros = bodega_precios.count()
        precio_total = sum(bp.precio for bp in bodega_precios)

        data_precios = [["ID", "Bodega", "Producto", "Precio"]]
        for bp in bodega_precios:
            data_precios.append([
                bp.id,
                bp.bodega.nombre if bp.bodega else "Sin Bodega",
                bp.producto.nombre if bp.producto else "Sin Producto",
                f"${bp.precio:.2f}"
            ])

        tabla_precios = Table(data_precios)
        tabla_precios.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.black),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
        ]))
        elementos.append(tabla_precios)
        elementos.append(Spacer(1, 15))

        elementos.append(Paragraph("<b>3. Resumen General</b>", styles['Heading2']))
        resumen_texto = f"""
        Se registraron {total_registros} productos en bodega,
        con un precio total acumulado de ${precio_total:.2f}.
        """
        elementos.append(Paragraph(resumen_texto, styles['Normal']))

        doc.build(elementos)
        return response