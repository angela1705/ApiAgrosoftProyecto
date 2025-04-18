from channels.generic.websocket import AsyncWebsocketConsumer
import json
from apps.Iot.datos_meteorologicos.models import Datos_metereologicos

class DatosMeteorologicosConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            Datos_metereologicos.objects.create(
                fk_sensor_id=data.get('fk_sensor'),
                fk_bancal_id=data.get('fk_bancal'),
                temperatura=data.get('temperatura'),
                humedad_ambiente=data.get('humedad_ambiente'),
                luminosidad=data.get('luminosidad'),
                lluvia=data.get('lluvia'),
                velocidad_viento=data.get('velocidad_viento'),
                direccion_viento=data.get('direccion_viento'),
                humedad_suelo=data.get('humedad_suelo'),
                ph_suelo=data.get('ph_suelo'),
                fecha_medicion=data.get('fecha_medicion')
            )
            await self.send(text_data=json.dumps({"status": "Datos recibidos"}))
        except Exception as e:
            await self.send(text_data=json.dumps({"error": str(e)}))

class RealtimeDataConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        await self.send(text_data=json.dumps({"message": "Datos en tiempo real recibidos"}))