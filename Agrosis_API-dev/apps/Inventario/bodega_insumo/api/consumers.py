from channels.generic.websocket import AsyncWebsocketConsumer
import json
from asgiref.sync import async_to_sync, sync_to_async
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from apps.Inventario.bodega_insumo.models import BodegaInsumo
from channels.layers import get_channel_layer
import logging
import uuid

logger = logging.getLogger(__name__)

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
        return [
            {
                "id": i.id,
                "bodega": i.bodega.nombre if i.bodega else "Desconocido",
                "insumo": i.insumo.nombre if i.insumo else "Desconocido",
                "cantidad": i.cantidad or 0
            }
            for i in BodegaInsumo.objects.all()
        ]

    async def send_initial_state(self):
        insumos = await self.get_all_insumos()
        await self.send(text_data=json.dumps({"action": "initial_state", "bodega_status": insumos}))

    async def send_update(self, event):
        await self.send(text_data=json.dumps(event["message"]))


sent_messages = set()

@receiver(post_save, sender=BodegaInsumo)
def insumo_saved(sender, instance, created, **kwargs):
    channel_layer = get_channel_layer()
    action = "create" if created else "update"
    logger.info(f"post_save disparado: id={instance.id}, action={action}")

    
    message_id = f"{action}-{instance.id}-{uuid.uuid4()}"

    
    message_key = f"{action}-{instance.id}"
    if message_key in sent_messages:
        logger.warning(f"Mensaje duplicado detectado: {message_key}")
        return
    sent_messages.add(message_key)

    
    try:
        bodega_name = instance.bodega.nombre if instance.bodega else "Desconocido"
    except Exception as e:
        logger.error(f"Error al obtener bodega.nombre: {e}")
        bodega_name = "Desconocido"

    try:
        insumo_name = instance.insumo.nombre if instance.insumo else "Desconocido"
    except Exception as e:
        logger.error(f"Error al obtener insumo.nombre: {e}")
        insumo_name = "Desconocido"

    def send_update():
        async_to_sync(channel_layer.group_send)(
            "bodega_insumo",
            {
                "type": "send_update",
                "message": {
                    "message_id": message_id,  
                    "id": instance.id,
                    "bodega": bodega_name,
                    "insumo": insumo_name,
                    "cantidad": instance.cantidad or 0,
                    "accion": action
                }
            }
        )

    send_update()

@receiver(post_delete, sender=BodegaInsumo)
def insumo_deleted(sender, instance, **kwargs):
    channel_layer = get_channel_layer()
    logger.info(f"post_delete disparado: id={instance.id}")

    
    message_id = f"delete-{instance.id}-{uuid.uuid4()}"

    
    message_key = f"delete-{instance.id}"
    if message_key in sent_messages:
        logger.warning(f"Mensaje duplicado detectado: {message_key}")
        return
    sent_messages.add(message_key)

    def send_update():
        async_to_sync(channel_layer.group_send)(
            "bodega_insumo",
            {
                "type": "send_update",
                "message": {
                    "message_id": message_id,  
                    "id": instance.id,
                    "accion": "delete"
                }
            }
        )

    send_update()