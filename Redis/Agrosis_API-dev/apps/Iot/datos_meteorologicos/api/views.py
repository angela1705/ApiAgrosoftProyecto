from rest_framework import viewsets
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from django.http import HttpResponse
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, Image
from reportlab.lib.units import inch
from datetime import datetime, timedelta
from apps.Iot.datos_meteorologicos.models import Datos_metereologicos
from apps.Iot.datos_meteorologicos.api.serializers import Datos_metereologicosSerializer
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Avg
from django.db.models.functions import TruncDate
import os
import logging

logger = logging.getLogger(__name__)

class DatosMeteorologicosViewSet(viewsets.ModelViewSet):
    queryset = Datos_metereologicos.objects.all()
    serializer_class = Datos_metereologicosSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['fk_sensor_id', 'fk_bancal_id', 'fecha_medicion']
    authentication_classes = [JWTAuthentication]

    def get_permissions(self):
        if self.request.method == 'POST':
            return [AllowAny()]
        return [IsAuthenticated()]

    def get_queryset(self):
        try:
            logger.info("[DatosMeteorologicosViewSet] Ejecutando get_queryset")
            queryset = super().get_queryset()
            logger.info(f"[DatosMeteorologicosViewSet] Total de registros en queryset: {queryset.count()}")

            fecha_inicio = self.request.query_params.get('fecha_inicio')
            fecha_fin = self.request.query_params.get('fecha_fin')
            if fecha_inicio and fecha_fin:
                try:
                    logger.info(f"[DatosMeteorologicosViewSet] Filtrando por rango de fechas: {fecha_inicio} a {fecha_fin}")
                    fecha_inicio_dt = datetime.strptime(fecha_inicio, '%Y-%m-%d')
                    fecha_fin_dt = datetime.strptime(fecha_fin, '%Y-%m-%d') + timedelta(days=1)
                    queryset = queryset.filter(
                        fecha_medicion__gte=fecha_inicio_dt,
                        fecha_medicion__lt=fecha_fin_dt
                    )
                    logger.info(f"[DatosMeteorologicosViewSet] Registros después de filtrar por fechas: {queryset.count()}")
                except ValueError as e:
                    logger.error(f"[DatosMeteorologicosViewSet] Formato de fecha inválido: {fecha_inicio} o {fecha_fin}, error: {str(e)}")
                    pass

            fk_bancal_id = self.request.query_params.get('fk_bancal_id')
            if fk_bancal_id:
                logger.info(f"[DatosMeteorologicosViewSet] Filtrando por fk_bancal_id: {fk_bancal_id}")
                queryset = queryset.filter(fk_bancal_id=fk_bancal_id)
                logger.info(f"[DatosMeteorologicosViewSet] Registros después de filtrar por bancal: {queryset.count()}")

            return queryset.order_by('-fecha_medicion')
        except Exception as e:
            logger.error(f"[DatosMeteorologicosViewSet] Error en get_queryset: {str(e)}")
            raise

    def create(self, request, *args, **kwargs):
        try:
            logger.info(f"[DatosMeteorologicosViewSet] Ejecutando create con datos: {request.data}")
            serializer = self.get_serializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                self.perform_create(serializer)
                headers = self.get_success_headers(serializer.data)
                logger.info(f"[DatosMeteorologicosViewSet] Datos registrados con éxito: {serializer.data}")
                return Response(serializer.data, status=201, headers=headers)
            else:
                logger.error(f"[DatosMeteorologicosViewSet] Datos inválidos: {serializer.errors}")
                return Response({"error": serializer.errors}, status=400)
        except Exception as e:
            logger.error(f"[DatosMeteorologicosViewSet] Error en create: {str(e)}")
            return Response({"error": str(e)}, status=400)

    @action(detail=False, methods=['get'])
    def reporte_pdf(self, request):
        try:
            logger.info("[DatosMeteorologicosViewSet] Ejecutando reporte_pdf a las %s", datetime.now().strftime('%H:%M:%S'))
            response = HttpResponse(content_type='application/pdf')
            response['Content-Disposition'] = 'attachment; filename="reporte_datos_meteorologicos.pdf"'

            doc = SimpleDocTemplate(response, pagesize=letter)
            elementos = []
            styles = getSampleStyleSheet()

            logo_path = "media/logo/def_AGROSIS_LOGOTIC.png"
            if not os.path.exists(logo_path):
                logger.error(f"[DatosMeteorologicosViewSet] Logo no encontrado en {logo_path}")
                return Response({"error": "Logo no encontrado"}, status=500)

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

            datos = self.get_queryset()
            total_datos = datos.count()
            logger.info(f"[DatosMeteorologicosViewSet] Total de datos para el reporte: {total_datos}")

            daily_averages = datos.annotate(date=TruncDate('fecha_medicion')).values('date').annotate(
                avg_temp=Avg('temperatura'),
                avg_hum=Avg('humedad_ambiente'),
                avg_humedad_suelo=Avg('humedad_suelo'),
                avg_calidad_aire=Avg('calidad_aire'),
                avg_luminosidad=Avg('luminosidad')
            ).order_by('date')

            overall_avg_temp = datos.aggregate(avg_temp=Avg('temperatura'))['avg_temp']
            overall_avg_hum = datos.aggregate(avg_hum=Avg('humedad_ambiente'))['avg_hum']
            overall_avg_humedad_suelo = datos.aggregate(avg_humedad_suelo=Avg('humedad_suelo'))['avg_humedad_suelo']
            overall_avg_calidad_aire = datos.aggregate(avg_calidad_aire=Avg('calidad_aire'))['avg_calidad_aire']
            overall_avg_luminosidad = datos.aggregate(avg_luminosidad=Avg('luminosidad'))['avg_luminosidad']

            elementos.append(Paragraph("<b>2. Registro de Datos Meteorológicos (Últimos 100 Registros)</b>", styles['Heading2']))
            elementos.append(Spacer(1, 5))

            datos_limitados = datos.order_by('-fecha_medicion')[:100]
            data_datos = [
                ["ID", "Sensor", "Bancal", "Temp (°C)", "Hum (%)", "Humedad Suelo (%)", "Calidad Aire (PPM)", "Luminosidad (lux)", "Fecha"]
            ]
            for dato in datos_limitados:
                try:
                    fecha = dato.fecha_medicion.strftime('%Y-%m-%d %H:%M') if dato.fecha_medicion else "N/A"
                    sensor_nombre = dato.fk_sensor.nombre if dato.fk_sensor and hasattr(dato.fk_sensor, 'nombre') else "N/A"
                    bancal_nombre = dato.fk_bancal.nombre if dato.fk_bancal and hasattr(dato.fk_bancal, 'nombre') else "N/A"
                    data_datos.append([
                        str(dato.id),
                        sensor_nombre,
                        bancal_nombre,
                        str(dato.temperatura) if dato.temperatura is not None else "N/A",
                        str(dato.humedad_ambiente) if dato.humedad_ambiente is not None else "N/A",
                        str(dato.humedad_suelo) if dato.humedad_suelo is not None else "N/A",
                        str(dato.calidad_aire) if dato.calidad_aire is not None else "N/A",
                        str(dato.luminosidad) if dato.luminosidad is not None else "N/A",
                        fecha
                    ])
                except Exception as e:
                    logger.error(f"[DatosMeteorologicosViewSet] Error al procesar dato {dato.id}: {str(e)}")
                    continue

            tabla_datos = Table(data_datos, colWidths=[30, 60, 60, 40, 40, 50, 50, 50, 80])
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

            elementos.append(Paragraph("<b>3. Promedios Diarios</b>", styles['Heading2']))
            elementos.append(Spacer(1, 5))

            data_daily_averages = [["Fecha", "Temp Prom (°C)", "Hum Prom (%)", "Humedad Suelo Prom (%)", "Calidad Aire Prom (PPM)", "Luminosidad Prom (lux)"]]
            for day in daily_averages:
                data_daily_averages.append([
                    day['date'].strftime('%Y-%m-%d'),
                    f"{day['avg_temp']:.2f}" if day['avg_temp'] is not None else "N/A",
                    f"{day['avg_hum']:.2f}" if day['avg_hum'] is not None else "N/A",
                    f"{day['avg_humedad_suelo']:.2f}" if day['avg_humedad_suelo'] is not None else "N/A",
                    f"{day['avg_calidad_aire']:.2f}" if day['avg_calidad_aire'] is not None else "N/A",
                    f"{day['avg_luminosidad']:.2f}" if day['avg_luminosidad'] is not None else "N/A",
                ])

            tabla_daily_averages = Table(data_daily_averages, colWidths=[80, 60, 60, 60, 60, 60])
            tabla_daily_averages.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.black),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, -1), 8),
                ('GRID', (0, 0), (-1, -1), 1, colors.black),
                ('VALIGN', (0, 1), (-1, -1), 'MIDDLE'),
            ]))
            elementos.append(tabla_daily_averages)
            elementos.append(Spacer(1, 15))

            elementos.append(Paragraph("<b>4. Resumen General</b>", styles['Heading2']))
            temp_prom_str = f"{overall_avg_temp:.2f} °C" if overall_avg_temp is not None else "N/A"
            hum_prom_str = f"{overall_avg_hum:.2f} %" if overall_avg_hum is not None else "N/A"
            humedad_suelo_prom_str = f"{overall_avg_humedad_suelo:.2f} %" if overall_avg_humedad_suelo is not None else "N/A"
            calidad_aire_prom_str = f"{overall_avg_calidad_aire:.2f} PPM" if overall_avg_calidad_aire is not None else "N/A"
            luminosidad_prom_str = f"{overall_avg_luminosidad:.2f} lux" if overall_avg_luminosidad is not None else "N/A"
            resumen_texto = f"""
            Se registraron {total_datos} mediciones meteorológicas en el sistema.<br/>
            - Temperatura Promedio General: {temp_prom_str}<br/>
            - Humedad Ambiente Promedio General: {hum_prom_str}<br/>
            - Humedad Suelo Promedio General: {humedad_suelo_prom_str}<br/>
            - Calidad Aire Promedio General: {calidad_aire_prom_str}<br/>
            - Luminosidad Promedio General: {luminosidad_prom_str}
            """
            elementos.append(Paragraph(resumen_texto, styles['Normal']))

            doc.build(elementos)
            logger.info("[DatosMeteorologicosViewSet] Reporte PDF generado exitosamente")
            return response
        except Exception as e:
            logger.error(f"[DatosMeteorologicosViewSet] Error en reporte_pdf: {str(e)}")
            return Response({"error": str(e)}, status=500)