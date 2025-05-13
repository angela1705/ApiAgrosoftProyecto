from rest_framework import viewsets, status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from apps.Iot.sensores.models import Sensor
from apps.Iot.datos_meteorologicos.models import Datos_metereologicos
from apps.Iot.datos_meteorologicos.api.serializers import Datos_metereologicos
from apps.Iot.sensores.api.serializers import SensorSerializer

from django.core.cache import cache
from django.utils import timezone
import logging

logger = logging.getLogger(__name__)

class SensorViewSet(viewsets.ModelViewSet):
    queryset = Sensor.objects.all()
    serializer_class = SensorSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def partial_update(self, request, *args, **kwargs):
        try:
            sensor = self.get_object()
            serializer = self.get_serializer(sensor, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            logger.info(f"Sensor {sensor.id} actualizado a estado: {serializer.data['estado']}")
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error al actualizar sensor {kwargs.get('pk')}: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class DatosMeteorologicosViewSet(viewsets.ModelViewSet):
    queryset = Datos_metereologicos.objects.all()
    serializer_class = Datos_metereologicos
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['fk_sensor', 'fk_bancal', 'fecha_medicion']

    def get_permissions(self):
        if self.action in ['create', 'realtime']:
            return [AllowAny()]
        return [IsAuthenticated()]

    def create(self, request, *args, **kwargs):
        """Guarda datos históricos en la base de datos."""
        try:
            logger.info(f"Recibiendo datos históricos: {request.data}")
            fk_sensor_id = request.data.get('fk_sensor')
            value = request.data.get('value')
            fk_bancal_id = request.data.get('fk_bancal', None)
            fecha_medicion = request.data.get('fecha_medicion', timezone.now().isoformat())

            if not fk_sensor_id or value is None:
                logger.error("Faltan fk_sensor o value")
                return Response({"error": "fk_sensor y value son requeridos"}, status=status.HTTP_400_BAD_REQUEST)

            sensor = Sensor.objects.filter(id=fk_sensor_id).first()
            if not sensor:
                logger.error(f"Sensor {fk_sensor_id} no encontrado")
                return Response({"error": "Sensor no encontrado"}, status=status.HTTP_404_NOT_FOUND)
            if sensor.estado != 'activo':
                logger.warning(f"Sensor {fk_sensor_id} inactivo")
                return Response({"error": "Sensor inactivo"}, status=status.HTTP_400_BAD_REQUEST)

            data = {
                'fk_sensor': fk_sensor_id,
                'fk_bancal': fk_bancal_id,
                'fecha_medicion': fecha_medicion,
                'temperatura': None,
                'humedad_ambiente': None,
                'luminosidad': None,
                'lluvia': None,
                'velocidad_viento': None,
                'direccion_viento': None,
                'humedad_suelo': None,
                'ph_suelo': None,
            }

            if sensor.tipo_sensor == 'temperatura':
                data['temperatura'] = value
            elif sensor.tipo_sensor == 'ambient_humidity':
                data['humedad_ambiente'] = value
            elif sensor.tipo_sensor == 'soil_humidity':
                data['humedad_suelo'] = value
            elif sensor.tipo_sensor == 'luminosity':
                data['luminosidad'] = value
            elif sensor.tipo_sensor == 'rainfall':
                data['lluvia'] = value
            elif sensor.tipo_sensor == 'wind_speed':
                data['velocidad_viento'] = value
            elif sensor.tipo_sensor == 'wind_direction':
                data['direccion_viento'] = value
            elif sensor.tipo_sensor == 'soil_ph':
                data['ph_suelo'] = value
            else:
                logger.error(f"Tipo de sensor no soportado: {sensor.tipo_sensor}")
                return Response({"error": "Tipo de sensor no soportado"}, status=status.HTTP_400_BAD_REQUEST)

            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            logger.info(f"Datos históricos guardados: {serializer.data}")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(f"Error en create: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def realtime(self, request):
        """Almacena datos en tiempo real en caché."""
        try:
            logger.info(f"Recibiendo datos en tiempo real: {request.data}")
            fk_sensor_id = request.data.get('fk_sensor')
            value = request.data.get('value')
            fecha_medicion = request.data.get('fecha_medicion', timezone.now().isoformat())

            if not fk_sensor_id or value is None:
                logger.error("Faltan fk_sensor o value")
                return Response({"error": "fk_sensor y value son requeridos"}, status=status.HTTP_400_BAD_REQUEST)

            sensor = Sensor.objects.filter(id=fk_sensor_id).first()
            if not sensor:
                logger.error(f"Sensor {fk_sensor_id} no encontrado")
                return Response({"error": "Sensor no encontrado"}, status=status.HTTP_404_NOT_FOUND)
            if sensor.estado != 'activo':
                logger.warning(f"Sensor {fk_sensor_id} inactivo")
                return Response({"error": "Sensor inactivo"}, status=status.HTTP_400_BAD_REQUEST)

            cache_key = f"realtime_data_{fk_sensor_id}"
            existing_data = cache.get(cache_key, [])
            data = {
                'id': len(existing_data) + 1,
                'sensor': fk_sensor_id,
                'tipo_sensor': sensor.tipo_sensor,
                'value': float(value),
                'fecha_medicion': fecha_medicion,
            }
            existing_data.append(data)
            cache.set(cache_key, existing_data[-50:], timeout=3600)
            logger.info(f"Datos en tiempo real almacenados en caché: {cache_key}")
            return Response(data, status=status.HTTP_201_CREATED)
        except ValueError as ve:
            logger.error(f"Error de valor en realtime: {str(ve)}")
            return Response({"error": "El valor debe ser numérico"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Error en realtime POST: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def realtime_get(self, request):
        """Obtiene datos en tiempo real desde el caché."""
        try:
            sensor_id = request.query_params.get('sensor_id')
            if not sensor_id:
                logger.error("Falta sensor_id")
                return Response({"error": "sensor_id es requerido"}, status=status.HTTP_400_BAD_REQUEST)
            cache_key = f"realtime_data_{sensor_id}"
            data = cache.get(cache_key, [])
            logger.info(f"Datos en tiempo real obtenidos: {cache_key}, count: {len(data)}")
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error en realtime GET: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)