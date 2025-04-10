from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
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

    @action(detail=True, methods=['post'])
    def registrar_venta(self, request, pk=None):
        """Registra una venta y actualiza el stock disponible."""
        producto = self.get_object()
        cantidad_vendida = request.data.get('cantidad', 0)
        
        try:
            cantidad_vendida = int(cantidad_vendida)
            if cantidad_vendida <= 0:
                return Response({"error": "La cantidad debe ser mayor a 0."}, status=status.HTTP_400_BAD_REQUEST)
            if cantidad_vendida > producto.stock_disponible:
                return Response({"error": "No hay suficiente stock disponible."}, status=status.HTTP_400_BAD_REQUEST)
            
            # esto sirve para mirar que stock esta disponible L 
            producto.stock_disponible -= cantidad_vendida
            producto.save()
            return Response({"mensaje": f"Venta registrada. Stock disponible actual: {producto.stock_disponible}"}, status=status.HTTP_200_OK)
        except ValueError:
            return Response({"error": "Cantidad inválida."}, status=status.HTTP_400_BAD_REQUEST)

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
            "Este documento detalla los precios, stock y fechas de caducidad de productos registrados en el sistema.",
            styles['Normal'])
        )
        elementos.append(Spacer(1, 15))

        elementos.append(Paragraph("<b>2. Registro de Precios de Productos</b>", styles['Heading2']))
        elementos.append(Spacer(1, 5))

        precios = PrecioProducto.objects.all()
        total_precios = precios.count()
        suma_precios = sum(precio.precio for precio in precios)

        data_precios = [
            ["ID", "Cultivo", "Unidad (g)", "Precio", "Fecha Registro", "Stock", "Stock Disponible", "Fecha Caducidad"]
        ]
        for precio in precios:
            fecha_registro = precio.fecha_registro.strftime('%Y-%m-%d')
            fecha_caducidad = precio.fecha_caducidad.strftime('%Y-%m-%d') if precio.fecha_caducidad else "N/A"
            data_precios.append([
                str(precio.id),
                str(precio.Producto),
                str(precio.unidad_medida_gramos),
                str(precio.precio),
                fecha_registro,
                str(precio.stock),
                str(precio.stock_disponible),
                fecha_caducidad
            ])

        tabla_precios = Table(data_precios, colWidths=[30, 130, 50, 50, 70, 50, 50, 70])
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