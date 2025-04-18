from rest_framework import viewsets
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.units import inch
from datetime import datetime
from apps.Iot.datos_meteorologicos.models import Datos_metereologicos, Evapotranspiracion
from apps.Iot.datos_meteorologicos.api.serializers import Datos_metereologicosSerializer, EvapotranspiracionSerializer
from django_filters.rest_framework import DjangoFilterBackend

class DatosMeteorologicosViewSet(viewsets.ModelViewSet):
    queryset = Datos_metereologicos.objects.all()
    serializer_class = Datos_metereologicosSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['fk_sensor_id', 'fecha_medicion']

    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        queryset = super().get_queryset()
        date = self.request.query_params.get('date')
        if date:
            queryset = queryset.filter(fecha_medicion__date=date)
        return queryset.order_by('-fecha_medicion')

    @action(detail=False, methods=['get'])
    def reporte_pdf(self, request):
        response = HttpResponse(content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="reporte_datos_meteorologicos.pdf"'

        doc = SimpleDocTemplate(response, pagesize=letter)
        elementos = []
        styles = getSampleStyleSheet()
 
        logo_path = "media/logo/def_AGROSIS_LOGOTIC.png"
        logo = Image(logo_path, width=50, height=35)
        encabezado_data = [
            [logo, Paragraph("<b>Agrosoft</b><br/>Reporte de Datos Meteorológicos", styles['Normal']), ""],
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
            "Este documento detalla los datos meteorológicos históricos registrados en el sistema, "
            "facilitando el análisis de las condiciones ambientales para la gestión de cultivos.",
            styles['Normal']
        ))
        elementos.append(Spacer(1, 15))

        elementos.append(Paragraph("<b>2. Registro de Datos Meteorológicos</b>", styles['Heading2']))
        elementos.append(Spacer(1, 5))

        datos = self.get_queryset()
        total_datos = datos.count()

        data_datos = [
            [
                "ID", "Sensor", "Bancal", "Temp (°C)", "Humedad (%)", "Luz (lux)", 
                "Lluvia (mm/h)", "V. Viento (m/s)", "D. Viento (°)", 
                "H. Suelo (%)", "pH Suelo", "Fecha"
            ]
        ]
        for dato in datos:
            fecha = dato.fecha_medicion.strftime('%Y-%m-%d %H:%M') if dato.fecha_medicion else "N/A"
            data_datos.append([
                str(dato.id),
                dato.fk_sensor.nombre if dato.fk_sensor else "N/A",
                dato.fk_bancal.nombre if dato.fk_bancal else "N/A",
                str(dato.temperatura) if dato.temperatura is not None else "N/A",
                str(dato.humedad_ambiente) if dato.humedad_ambiente is not None else "N/A",
                str(dato.luminosidad) if dato.luminosidad is not None else "N/A",
                str(dato.lluvia) if dato.lluvia is not None else "N/A",
                str(dato.velocidad_viento) if dato.velocidad_viento is not None else "N/A",
                str(dato.direccion_viento) if dato.direccion_viento is not None else "N/A",
                str(dato.humedad_suelo) if dato.humedad_suelo is not None else "N/A",
                str(dato.ph_suelo) if dato.ph_suelo is not None else "N/A",
                fecha
            ])

        tabla_datos = Table(data_datos, colWidths=[30, 60, 60, 40, 40, 40, 40, 40, 40, 40, 40, 80])
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
        Se registraron {total_datos} mediciones meteorológicas en el sistema.
        """
        elementos.append(Paragraph(resumen_texto, styles['Normal']))

        doc.build(elementos)
        return response

class EvapotranspiracionViewSet(viewsets.ModelViewSet):
    queryset = Evapotranspiracion.objects.all()
    serializer_class = EvapotranspiracionSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['fk_bancal_id', 'fecha']