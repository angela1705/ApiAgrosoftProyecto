import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from apps.Iot.datos_meteorologicos.api.serializers import Datos_metereologicosSerializer
from apps.Iot.sensores.models import Sensor

logger = logging.getLogger(__name__)

class RealtimeDataConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("weather_group", self.channel_name)
        await self.accept()
        logger.info(f"Conexión WebSocket aceptada en /ws/realtime/ para {self.channel_name}")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("weather_group", self.channel_name)
        logger.info(f"Conexión WebSocket cerrada en /ws/realtime/, código: {close_code}")

    @database_sync_to_async
    def get_sensor(self, device_code):
        try:
            sensor = Sensor.objects.get(device_code=device_code, estado='activo')
            logger.debug(f"Sensor encontrado: {sensor.nombre} (device_code: {device_code})")
            return sensor
        except Sensor.DoesNotExist:
            logger.error(f"Sensor con device_code {device_code} no existe o está inactivo")
            return None

    @database_sync_to_async
    def save_data(self, data):
        try:
            serializer = Datos_metereologicosSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                obj = serializer.save()
                logger.info(f"Datos guardados en la base de datos: {obj.id}")
                return {
                    'id': obj.id,
                    'fk_sensor': obj.fk_sensor.id if obj.fk_sensor else None,
                    'sensor_nombre': obj.fk_sensor.nombre if obj.fk_sensor else 'N/A',
                    'fk_bancal': obj.fk_bancal.id if obj.fk_bancal else None,
                    'bancal_nombre': obj.fk_bancal.nombre if obj.fk_bancal else 'N/A',
                    'temperatura': float(obj.temperatura) if obj.temperatura is not None else None,
                    'humedad_ambiente': float(obj.humedad_ambiente) if obj.humedad_ambiente is not None else None,
                    'luminosidad': float(obj.luminosidad) if obj.luminosidad is not None else None,
                    'lluvia': float(obj.lluvia) if obj.lluvia is not None else None,
                    'velocidad_viento': float(obj.velocidad_viento) if obj.velocidad_viento is not None else None,
                    'direccion_viento': float(obj.direccion_viento) if obj.direccion_viento is not None else None,
                    'humedad_suelo': float(obj.humedad_suelo) if obj.humedad_suelo is not None else None,
                    'ph_suelo': float(obj.ph_suelo) if obj.ph_suelo is not None else None,
                    'fecha_medicion': obj.fecha_medicion.isoformat() if obj.fecha_medicion else None,
                }
            return None
        except Exception as e:
            logger.error(f"Error al guardar datos: {str(e)}", exc_info=True)
            return None

    async def receive(self, text_data):
        logger.info(f"RECIBIDO EN /ws/realtime/: {text_data}")  # Log para confirmar recepción
        try:
            data = json.loads(text_data)
            logger.debug(f"Datos parseados: {data}")
            device_code = data.get('device_code')
            if not device_code:
                logger.error("device_code no proporcionado")
                await self.send(text_data=json.dumps({"error": "device_code requerido"}))
                return

            sensor = await self.get_sensor(device_code)
            if not sensor:
                logger.error(f"Sensor con device_code {device_code} no válido")
                await self.send(text_data=json.dumps({"error": f"Sensor con device_code {device_code} no existe o está inactivo"}))
                return

            saved_data = await self.save_data(data)
            if saved_data:
                logger.info(f"Datos procesados para device_code {device_code}: {saved_data}")
                await self.channel_layer.group_send(
                    "weather_group",
                    {
                        "type": "weather_data",
                        "data": saved_data
                    }
                )
                await self.send(text_data=json.dumps({"status": "ok", "data": saved_data}))
            else:
                logger.error("Error al guardar datos en la base de datos")
                await self.send(text_data=json.dumps({"error": "Error al guardar datos"}))
        except json.JSONDecodeError:
            logger.error(f"Datos JSON inválidos: {text_data}")
            await self.send(text_data=json.dumps({"error": "Datos JSON inválidos"}))
        except Exception as e:
            logger.error(f"Error en receive: {str(e)}", exc_info=True)
            await self.send(text_data=json.dumps({"error": f"Error inesperado: {str(e)}"}))

    async def weather_data(self, event):
        data = event['data']
        logger.debug(f"Enviando datos al cliente: {data}")
        await self.send(text_data=json.dumps({
            'type': 'weather_data',
            'data': data
        }))