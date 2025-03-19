from channels.generic.websocket import AsyncWebsocketConsumer
import json
from asgiref.sync import async_to_sync, sync_to_async
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from apps.Inventario.bodega_herramienta.models import BodegaHerramienta
from channels.layers import get_channel_layer
from django.urls import re_path
import uuid

class BodegaHerramientaConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("bodega_herramienta", self.channel_name)
        await self.accept()
        await self.send_initial_state()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("bodega_herramienta", self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        if data.get("action") == "sync":
            await self.send_initial_state()

    @sync_to_async
    def get_all_herramientas(self):
        return [
            {
                "id": h.id,
                "bodega": h.bodega.nombre if h.bodega else "Desconocido",
                "herramienta": h.herramienta.nombre if h.herramienta else "Desconocido",
                "cantidad": h.cantidad or 0
            }
            for h in BodegaHerramienta.objects.all()
        ]

    async def send_initial_state(self):
        herramientas = await self.get_all_herramientas()
        await self.send(text_data=json.dumps({
            "action": "initial_state",
            "data": herramientas,
            "message_id": str(uuid.uuid4())
        }))

    async def send_update(self, event):
        await self.send(text_data=json.dumps(event["message"]))

@receiver(post_save, sender=BodegaHerramienta)
def herramienta_saved(sender, instance, created, **kwargs):
    channel_layer = get_channel_layer()
    message = {
        "type": "send_update",
        "message": {
            "id": instance.id,
            "bodega": instance.bodega.nombre if instance.bodega else "Desconocido",
            "herramienta": instance.herramienta.nombre if instance.herramienta else "Desconocido",
            "cantidad": instance.cantidad or 0,
            "accion": "create" if created else "update"
        }
    }
    async_to_sync(channel_layer.group_send)("bodega_herramienta", message)

@receiver(post_delete, sender=BodegaHerramienta)
def herramienta_deleted(sender, instance, **kwargs):
    channel_layer = get_channel_layer()
    message = {
        "type": "send_update",
        "message": {
            "id": instance.id,
            "accion": "delete"
        }
    }
    async_to_sync(channel_layer.group_send)("bodega_herramienta", message)

websocket_urlpatterns = [
    re_path(r'ws/inventario/bodega_herramienta/$', BodegaHerramientaConsumer.as_asgi())
]