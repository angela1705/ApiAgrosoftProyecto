from channels.generic.websocket import AsyncWebsocketConsumer
import json
from asgiref.sync import async_to_sync, sync_to_async
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from apps.Inventario.bodega_insumo.models import BodegaInsumo
from channels.layers import get_channel_layer

class BodegaInsumoConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("bodega_insumo", self.channel_name)
        await self.accept()
        await self.send_initial_state()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("bodega_insumo", self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        if data.get("action") == "sync":
            await self.send_initial_state()

    @sync_to_async
    def get_all_insumos(self):
        return [{"id": i.id, "bodega": i.bodega.nombre, "insumo": i.insumo.nombre, "cantidad": i.cantidad} for i in BodegaInsumo.objects.all()]

    async def send_initial_state(self):
        insumos = await self.get_all_insumos()
        await self.send(text_data=json.dumps({"action": "initial_state", "data": insumos}))

    async def send_update(self, event):
        await self.send(text_data=json.dumps(event["message"]))

@receiver(post_save, sender=BodegaInsumo)
@receiver(post_delete, sender=BodegaInsumo)
def insumo_updated(sender, instance, **kwargs):
    channel_layer = get_channel_layer()

    def send_update():
        async_to_sync(channel_layer.group_send)(
            "bodega_insumo",
            {
                "type": "send_update",
                "message": {
                    "id": instance.id,
                    "bodega": instance.bodega.nombre,
                    "insumo": instance.insumo.nombre,
                    "cantidad": instance.cantidad,
                    "accion": "update"
                }
            }
        )

    send_update()
