import json
import logging
from decimal import Decimal
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from apps.Iot.datos_meteorologicos.api.serializers import Datos_metereologicosSerializer
from apps.Iot.sensores.models import Sensor

logger = logging.getLogger(__name__)

# Lista en memoria para datos en tiempo real (usada por tasks.py)
realtime_data_buffer = []

class DatosMeteorologicosConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        logger.info(f"Conexión WebSocket aceptada: {self.channel_name}")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("weather_group", self.channel_name)
        logger.info(f"Conexión WebSocket cerrada: {self.channel_name}, código: {close_code}")

    @database_sync_to_async
    def check_sensor_state(self, sensor_id):
        try:
            sensor = Sensor.objects.get(id=sensor_id)
            return sensor.estado == 'activo'
        except Sensor.DoesNotExist:
            logger.error(f"Sensor {sensor_id} no existe")
            return False

    async def receive(self, text_data):
        global realtime_data_buffer
        try:
            data = json.loads(text_data)
            logger.debug(f"Datos recibidos: {data}")
            sensor_id = data.get('fk_sensor')
            if not sensor_id:
                logger.error("fk_sensor no proporcionado")
                await self.send(text_data=json.dumps({"error": "fk_sensor requerido"}))
                return

            # Verificar estado del sensor
            is_active = await self.check_sensor_state(sensor_id)
            if not is_active:
                logger.info(f"Sensor inactivo: {sensor_id}")
                await self.send(text_data=json.dumps({"status": "Sensor inactivo, datos ignorados"}))
                return

            serializer = Datos_metereologicosSerializer(data=data)
            is_valid = await database_sync_to_async(serializer.is_valid)()
            if is_valid:
                validated_data = await database_sync_to_async(lambda: serializer.validated_data)()
                # Logs específicos para humedad
                if 'humedad_ambiente' in validated_data and validated_data['humedad_ambiente'] is not None:
                    logger.info(f"Humedad ambiente validada para sensor {sensor_id}: {validated_data['humedad_ambiente']}")
                if 'humedad_suelo' in validated_data and validated_data['humedad_suelo'] is not None:
                    logger.info(f"Humedad suelo validada para sensor {sensor_id}: {validated_data['humedad_suelo']}")
                logger.info(f"Datos validados para sensor {sensor_id}: {validated_data}")
                await self.send(text_data=json.dumps({"status": "Datos recibidos"}))

                # Preparar datos serializables
                cleaned_data = {}
                for k, v in validated_data.items():
                    if k == 'fk_sensor' and v is not None:
                        cleaned_data[k] = v.id
                    elif k == 'fk_bancal' and v is not None:
                        cleaned_data[k] = v.id
                    elif k == 'fecha_medicion' and v is not None:
                        cleaned_data[k] = v.isoformat()
                    elif isinstance(v, Decimal):
                        cleaned_data[k] = float(v)
                    elif v is not None:
                        cleaned_data[k] = v

                # Agregar al buffer para históricos
                logger.debug(f"Agregando a buffer (sensor {sensor_id}): {cleaned_data}")
                realtime_data_buffer.append(cleaned_data.copy())
                realtime_data_buffer = realtime_data_buffer[-1000:]

                # Enviar al grupo
                try:
                    logger.info(f"Enviando al grupo (sensor {sensor_id}): {cleaned_data}")
                    await self.channel_layer.group_send(
                        "weather_group",
                        {
                            "type": "weather_data",
                            "data": cleaned_data
                        }
                    )
                except Exception as e:
                    logger.error(f"Error al enviar al grupo (sensor {sensor_id}): {str(e)}")
                    await self.send(text_data=json.dumps({"warning": f"Error al enviar al grupo: {str(e)}"}))
            else:
                errors = await database_sync_to_async(lambda: serializer.errors)()
                logger.error(f"Error de validación para sensor {sensor_id}: {errors}")
                await self.send(text_data=json.dumps({"error": errors}))
        except json.JSONDecodeError as e:
            logger.error(f"Datos JSON inválidos: {str(e)}")
            await self.send(text_data=json.dumps({"error": "Datos JSON inválidos"}))
        except Exception as e:
            logger.error(f"Error inesperado en receive: {str(e)}", exc_info=True)
            await self.send(text_data=json.dumps({"error": f"Error inesperado: {str(e)}"}))

class RealtimeDataConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("weather_group", self.channel_name)
        await self.accept()
        logger.info(f"Conexión WebSocket añadida al grupo weather_group: {self.channel_name}")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("weather_group", self.channel_name)
        logger.info(f"Conexión WebSocket removida del grupo weather_group: {self.channel_name}, código: {close_code}")

    async def weather_data(self, event):
        data = event['data']
        logger.debug(f"Enviando a cliente: {data}")
        await self.send(text_data=json.dumps({
            'type': 'weather_data',
            'data': data
        }))