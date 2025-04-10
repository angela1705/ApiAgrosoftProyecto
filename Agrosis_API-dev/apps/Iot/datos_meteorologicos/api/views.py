from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from django.http import HttpResponse
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from datetime import datetime
import os
from django.conf import settings
from ..models import Datos_metereologicos
from .serializers import Datos_metereologicosSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead
import logging

logger = logging.getLogger(__name__)

class Datos_metereologicosViewset(ModelViewSet):
    serializer_class = Datos_metereologicosSerializer

    def get_queryset(self):
        # Obtener el queryset base
        queryset = Datos_metereologicos.objects.all()

        # Aplicar filtros desde los parámetros de la URL
        fk_sensor = self.request.query_params.get("fk_sensor", None)
        fecha = self.request.query_params.get("fecha_medicion__date", None)

        logger.info(f"Parámetros recibidos - fk_sensor: {fk_sensor}, fecha_medicion__date: {fecha}")

        if fk_sensor is not None:
            queryset = queryset.filter(fk_sensor__id=fk_sensor)
            logger.info(f"Filtrado por fk_sensor__id={fk_sensor}, resultados: {queryset.count()}")
        if fecha is not None:
            queryset = queryset.filter(fecha_medicion__date=fecha)
            logger.info(f"Filtrado por fecha_medicion__date={fecha}, resultados: {queryset.count()}")

        logger.info(f"Total de resultados después de filtros: {queryset.count()}")
        return queryset

    def get_authenticators(self):
        # Solo aplica JWTAuthentication para acciones que no sean POST
        if self.request.method != 'POST':
            return [JWTAuthentication()]
        return []

    def get_permissions(self):
        # Permite POST sin autenticación ni permisos, otras acciones requieren autenticación y permisos
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated(), IsAdminOrRead()]

    @action(detail=False, methods=['get'])
    def reporte_pdf(self, request):
        # Configurar la respuesta como un archivo PDF
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="reporte_datos_meteorologicos.pdf"'

        # Crear el documento PDF
        doc = SimpleDocTemplate(response, pagesize=letter)
        elementos = []
        styles = getSampleStyleSheet()

        # Logo (reutilizando la misma lógica que en BodegaInsumo)
        logo_path = os.path.join(settings.BASE_DIR, "media/logo/def_AGROSIS_LOGOTIC.png")
        if os.path.exists(logo_path):
            logo = Image(logo_path, width=50, height=35)
        else:
            logo = Paragraph("No Logo Disponible", styles["Normal"])

        # Encabezado
        encabezado_data = [
            [logo, Paragraph("<b>Empresa XYZ</b><br/>Reporte de Datos Meteorológicos", styles['Normal']), ""],
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

        # Sección Objetivo
        elementos.append(Paragraph("<b>1. Objetivo</b>", styles['Heading2']))
        elementos.append(Paragraph(
            "Este documento detalla los datos meteorológicos registrados, facilitando su análisis y seguimiento.",
            styles['Normal'])
        )
        elementos.append(Spacer(1, 15))

        # Sección Datos Meteorológicos
        elementos.append(Paragraph("<b>2. Datos Meteorológicos</b>", styles['Heading2']))
        elementos.append(Spacer(1, 5))

        # Obtener los datos con el queryset filtrado
        datos_metereologicos = self.get_queryset()
        data_datos = [["ID", "Sensor", "Temperatura (°C)", "Humedad (%)", "Fecha"]]
        for dato in datos_metereologicos:
            data_datos.append([
                dato.id,
                dato.fk_sensor.nombre if dato.fk_sensor else "N/A",
                dato.temperature,
                dato.humidity,
                dato.fecha_medicion.strftime("%Y-%m-%d %H:%M:%S") if dato.fecha_medicion else "N/A",
            ])

        tabla_datos = Table(data_datos, colWidths=[50, 100, 100, 100, 150])
        tabla_datos.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, 0), colors.black),
            ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
            ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
            ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
            ('GRID', (0, 0), (-1, -1), 1, colors.black),
            ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ]))
        elementos.append(tabla_datos)
        elementos.append(Spacer(1, 15))

        # Sección Resumen General
        elementos.append(Paragraph("<b>3. Resumen General</b>", styles['Heading2']))
        total_datos = datos_metereologicos.count()
        resumen_texto = f"Se registraron {total_datos} mediciones meteorológicas."
        elementos.append(Paragraph(resumen_texto, styles['Normal']))

        # Construir el PDF
        doc.build(elementos)
        return response