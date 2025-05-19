import json
import logging
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from apps.Iot.datos_meteorologicos.models import Datos_metereologicos
from apps.Iot.datos_meteorologicos.api.serializers import Datos_metereologicosSerializer
from decimal import Decimal

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
            logger.info(f"Datos recibidos en ws/realtime/: {data}")
            serializer = Datos_metereologicosSerializer(data=data)
            is_valid = await database_sync_to_async(serializer.is_valid)()
            if is_valid:
                validated_data = await database_sync_to_async(lambda: serializer.validated_data)()
                # Convertir Decimal a float y datetime a string
                cleaned_data = {
                    'fk_sensor': validated_data.get('fk_sensor').id,
                    'fk_bancal': validated_data.get('fk_bancal').id,
                    'temperatura': float(validated_data.get('temperatura')) if validated_data.get('temperatura') is not None else None,
                    'humedad_ambiente': float(validated_data.get('humedad_ambiente')) if validated_data.get('humedad_ambiente') is not None else None,
                    'fecha_medicion': validated_data.get('fecha_medicion').isoformat() if validated_data.get('fecha_medicion') else None
                }
                logger.info(f"Datos validados para sensor {cleaned_data['fk_sensor']}: {cleaned_data}")
                await self.channel_layer.group_send(
                    "weather_group",
                    {
                        "type": "weather_data",
                        "data": cleaned_data
                    }
                )
                logger.info(f"Enviando al grupo (sensor {cleaned_data['fk_sensor']}): {cleaned_data}")
                await self.send(text_data=json.dumps({"status": "Datos recibidos"}))
            else:
                errors = await database_sync_to_async(lambda: serializer.errors)()
                logger.error(f"Error de validación: {errors}")
                await self.send(text_data=json.dumps({"error": errors}))
        except json.JSONDecodeError as e:
            logger.error(f"Datos JSON inválidos: {str(e)}")
            await self.send(text_data=json.dumps({"error": "Datos JSON inválidos"}))
        except Exception as e:
            logger.error(f"Error inesperado en receive: {str(e)}", exc_info=True)
            await self.send(text_data=json.dumps({"error": f"Error inesperado: {str(e)}"}))

    async def weather_data(self, event):
        data = event['data']
        logger.info(f"Enviando datos a cliente en ws/realtime/: {data}")
        await self.send(text_data=json.dumps({
            'type': 'weather_data',
            'data': data
        }))