import json
from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from ..models import Datos_metereologicos
import asyncio
from django.utils import timezone

 
class RealtimeDataConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "realtime_group"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        if data.get("type") == "realtime_data":
            await self.channel_layer.group_send(
                self.group_name,
                {"type": "send_realtime_data", "data": data["data"]}
            )

    async def send_realtime_data(self, event):
        await self.send(text_data=json.dumps({"type": "realtime_data", "data": event["data"]}))

# Consumidor para datos guardados (modificado)
class DatosMeteorologicosConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "meteo_group"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()
        # Enviar datos iniciales sin filtro
        sensor_data = await self.get_sensor_data()
        await self.send(text_data=json.dumps({"type": "sensor_data", "data": sensor_data}))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        if data.get("type") == "filter_data":
            sensor_id = data.get("sensor_id")
            date = data.get("date")
            filtered_data = await self.get_sensor_data(sensor_id, date)
            await self.send(text_data=json.dumps({"type": "sensor_data", "data": filtered_data}))

    async def send_sensor_data(self, event):
        data = event["data"]
        await self.send(text_data=json.dumps({"type": "sensor_data", "data": data}))

    @sync_to_async
    def get_sensor_data(self, sensor_id=None, date=None):
        queryset = Datos_metereologicos.objects.all().order_by('-fecha_medicion')
        if sensor_id:
            queryset = queryset.filter(fk_sensor=sensor_id)
        if date:
            queryset = queryset.filter(fecha_medicion__date=date)
        datos = queryset[:50]  # Límite de 50 para no sobrecargar me paso que puse limite cuidado congela la app y la pc y todo 
        return [
            {
                "id": d.id,
                "fk_sensor": d.fk_sensor,
                "temperature": float(d.temperature) if d.temperature is not None else None,
                "humidity": float(d.humidity) if d.humidity is not None else None,
                "fecha_medicion": d.fecha_medicion.isoformat()
            } for d in datos
        ]

async def broadcast_sensor_data():
    from channels.layers import get_channel_layer
    channel_layer = get_channel_layer()
    if channel_layer:
        sensor_data = await DatosMeteorologicosConsumer().get_sensor_data()
        await channel_layer.group_send("meteo_group", {"type": "send_sensor_data", "data": sensor_data})

from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=Datos_metereologicos)
def on_datos_metereologicos_save(sender, instance, created, **kwargs):
    if created:
        print(f"Nuevo dato creado: {instance.id}")
        asyncio.create_task(broadcast_sensor_data())