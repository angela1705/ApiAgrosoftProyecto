import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from apps.Iot.datos_meteorologicos.api.serializers import Datos_metereologicosSerializer

logger = logging.getLogger(__name__)

class RealtimeDataConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("weather_group", self.channel_name)
        await self.accept()
        logger.info("Cliente conectado a ws/realtime/")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("weather_group", self.channel_name)
        logger.info(f"Cliente desconectado de ws/realtime/, código: {close_code}")

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            logger.info(f"[WebSocket] Datos recibidos: {data}")
            serializer = Datos_metereologicosSerializer(data=data)
            is_valid = await database_sync_to_async(serializer.is_valid)()
            if is_valid:
                obj = await database_sync_to_async(serializer.save)()
                cleaned_data = {
                    'id': obj.id,
                    'fk_sensor': obj.fk_sensor.id if obj.fk_sensor else None,
                    'fk_bancal': obj.fk_bancal.id if obj.fk_bancal else None,
                    'temperatura': float(obj.temperatura) if obj.temperatura is not None else None,
                    'humedad_ambiente': float(obj.humedad_ambiente) if obj.humedad_ambiente is not None else None,
                    'luminosidad': float(obj.luminosidad) if obj.luminosidad is not None else None,
                    'lluvia': float(obj.lluvia) if obj.lluvia is not None else None,
                    'velocidad_viento': float(obj.velocidad_viento) if obj.velocidad_viento is not None else None,
                    'direccion_viento': float(obj.direccion_viento) if obj.direccion_viento is not None else None,
                    'humedad_suelo': float(obj.humedad_suelo) if obj.humedad_suelo is not None else None,
                    'ph_suelo': float(obj.ph_suelo) if obj.ph_suelo is not None else None,
                    'fecha_medicion': obj.fecha_medicion.isoformat() if obj.fecha_medicion else None
                }
                logger.info(f"[WebSocket] Datos guardados: {cleaned_data}")
                await self.channel_layer.group_send(
                    "weather_group",
                    {
                        "type": "weather_data",
                        "data": cleaned_data
                    }
                )
                await self.send(text_data=json.dumps({"status": "ok"}))
            else:
                errors = await database_sync_to_async(lambda: serializer.errors)()
                logger.error(f"[WebSocket] Error de validación: {errors}")
                await self.send(text_data=json.dumps({"error": errors}))
        except json.JSONDecodeError as e:
            logger.error(f"[WebSocket] JSON inválido: {str(e)}")
            await self.send(text_data=json.dumps({"error": "JSON inválido"}))
        except Exception as e:
            logger.error(f"[WebSocket] Error inesperado: {str(e)}", exc_info=True)
            await self.send(text_data=json.dumps({"error": f"Error inesperado: {str(e)}"}))

    async def weather_data(self, event):
        data = event['data']
        await self.send(text_data=json.dumps({
            'type': 'weather_data',
            'data': data
        }))