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
from apps.Cultivo.especies.models import Especie 
from apps.Cultivo.tipo_especies.models import TipoEspecie 

from apps.Cultivo.especies.api.serializers import EspecieSerializer    
   
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead 
from apps.Usuarios.usuarios.api.permissions import PermisoPorRol

class EspecieViewSet(ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrRead, PermisoPorRol] 
    queryset = Especie.objects.all()
    serializer_class = EspecieSerializer

    @action(detail=False, methods=['get'], url_path="reporte_pdf")
    def reporte_especies_tipos(self, request):
        especies = Especie.objects.all().select_related('fk_tipo_especie')
        tipos_especie = TipoEspecie.objects.all()
        
        total_especies = especies.count()
        total_tipos = tipos_especie.count()
        
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="reporte_especies_tipos.pdf"'

        doc = SimpleDocTemplate(response, pagesize=letter)
        elementos = []

        styles = getSampleStyleSheet()
        
        logo_path = "media/logo/def_AGROSIS_LOGOTIC.png" 
        logo = Image(logo_path, width=50, height=35)

        encabezado_data = [
            [logo, Paragraph("<b>Centro de gestión y desarrollo sostenible surcolombiano<br/>SENA - YAMBORÓ</b>", styles['Normal']), ""],
            ["", Paragraph("<b>Informe de Especies y Tipos Registrados</b>", styles['Heading2']), Paragraph(f"{datetime.today().strftime('%Y-%m-%d')}", styles['Normal'])],
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

        subtitulo = Paragraph("Informe de especies y tipos registrados", styles['Heading2'])
        elementos.append(subtitulo)
        elementos.append(Spacer(1, 10))

        objetivo_texto = "Este documento presenta un listado detallado de todas las especies y tipos de especies registrados en el sistema. El objetivo es proporcionar una visión completa del catálogo disponible para facilitar la consulta y gestión de la biodiversidad registrada."
        objetivo = Paragraph("<b>1. Objetivo</b><br/>" + objetivo_texto, styles['Normal'])
        elementos.append(objetivo)
        elementos.append(Spacer(1, 15))

        elementos.append(Paragraph("<b>2. Tipos de Especies Registrados</b>", styles['Heading3']))
        elementos.append(Spacer(1, 5))

        data_tipos = [["ID", "Nombre", "Descripción"]]
        for tipo in tipos_especie:
            data_tipos.append([
                tipo.id,
                tipo.nombre,
                tipo.descripcion[:100] + "..." if len(tipo.descripcion) > 100 else tipo.descripcion
            ])

        tabla_tipos = Table(data_tipos)
        tabla_tipos.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.black),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('FONTSIZE', (0, 0), (-1, -1), 8),
        ]))
        elementos.append(tabla_tipos)
        elementos.append(Spacer(1, 15))

        elementos.append(Paragraph("<b>3. Especies Registradas</b>", styles['Heading3']))
        elementos.append(Spacer(1, 5))

        data_especies = [["ID", "Nombre", "Tipo", "Descripción", "Largo Crecimiento"]]
        for especie in especies:
            data_especies.append([
                especie.id,
                especie.nombre,
                especie.fk_tipo_especie.nombre,
                especie.descripcion[:80] + "..." if len(especie.descripcion) > 80 else especie.descripcion,
                f"{especie.largoCrecimiento} días"
            ])

        tabla_especies = Table(data_especies, colWidths=[30, 80, 60, 200, 60])
        tabla_especies.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.black),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('FONTSIZE', (0, 0), (-1, -1), 7),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ]))
        elementos.append(tabla_especies)
        elementos.append(Spacer(1, 15))

        elementos.append(Paragraph("<b>4. Resumen General</b>", styles['Heading3']))
        resumen_texto = f"""
        El sistema cuenta actualmente con {total_tipos} tipos de especies registrados y {total_especies} especies asociadas a estos tipos.
        Este reporte proporciona una visión completa del catálogo disponible en el sistema.
        """
        elementos.append(Paragraph(resumen_texto, styles['Normal']))

        doc.build(elementos)

        return response