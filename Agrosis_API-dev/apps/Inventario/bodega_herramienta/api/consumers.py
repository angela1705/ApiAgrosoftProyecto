import json
import asyncio
import hashlib
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from django.utils import timezone
from ..models import BodegaHerramienta
from apps.Cultivo.actividades.models import PrestamoHerramienta
import logging

logger = logging.getLogger(__name__)
User = get_user_model()
active_connections = {}

class BodegaHerramientaConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.sent_notifications = set()
        self.check_task = None
        self.user_id = None
        self.group_name = None

    async def connect(self):
        self.user_id = self.scope['url_route']['kwargs'].get('user_id')
        if self.user_id == 'admin':
            self.group_name = "bodega_herramienta_admin_group"
        else:
            try:
                self.user_id = int(self.user_id)
                if not await self.get_user(self.user_id):
                    await self.close(code=4001)
                    return
                self.group_name = f"bodega_herramienta_user_{self.user_id}"
            except (ValueError, TypeError):
                await self.close(code=4000)
                return

        if self.group_name in active_connections:
            await active_connections[self.group_name].close(code=4002)
        active_connections[self.group_name] = self
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()
        self.check_task = asyncio.create_task(self.periodic_check())

    async def disconnect(self, close_code):
        if self.group_name and self.group_name in active_connections:
            if active_connections[self.group_name] == self:
                del active_connections[self.group_name]
        if hasattr(self, 'group_name'):
            await self.channel_layer.group_discard(self.group_name, self.channel_name)
        if self.check_task:
            self.check_task.cancel()

    async def send_notification(self, event):
        current_hash = event['hash']
        if current_hash in self.sent_notifications:
            return
        if self.group_name not in active_connections or active_connections[self.group_name] != self:
            return
        self.sent_notifications.add(current_hash)
        message_data = {
            'message': event['message'],
            'notification_type': event.get('notification_type', 'info'),
            'timestamp': event.get('timestamp'),
            'herramienta_id': event.get('herramienta_id'),
            'actividad_id': event.get('actividad_id'),
            'hash': current_hash
        }
        await self.send(text_data=json.dumps(message_data))

    @database_sync_to_async
    def get_user(self, user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None

    @database_sync_to_async
    def check_herramientas(self):
        herramientas = BodegaHerramienta.objects.select_related('herramienta', 'bodega').all()
        notificaciones = []
        timestamp = str(int(timezone.now().timestamp() * 1000))
        umbral_cantidad = 10

        for herramienta in herramientas:
            if herramienta.cantidad <= umbral_cantidad:
                herramienta_hash = hashlib.md5(f"{herramienta.id}low_stock".encode()).hexdigest()
                notif = {
                    "herramienta_id": herramienta.id,
                    "message": f"La herramienta {herramienta.herramienta.nombre} en {herramienta.bodega.nombre} está baja en stock: {herramienta.cantidad} unidades restantes.",
                    "notification_type": "warning",
                    "timestamp": timestamp,
                    "hash": herramienta_hash
                }
                notificaciones.append(notif)
            if herramienta.cantidad_prestada > 0:
                prestamos = PrestamoHerramienta.objects.filter(
                    herramienta_id=herramienta.herramienta.id, 
                    bodega_herramienta_id=herramienta.id, 
                    devuelta=False
                )
                for prestamo in prestamos:
                    herramienta_hash = hashlib.md5(f"{herramienta.id}lent_{prestamo.id}".encode()).hexdigest()
                    notif = {
                        "herramienta_id": herramienta.id,
                        "actividad_id": prestamo.actividad_id,
                        "message": f"{herramienta.cantidad_prestada} unidades de {herramienta.herramienta.nombre} están prestadas para la actividad ID {prestamo.actividad_id}.",
                        "notification_type": "info",
                        "timestamp": timestamp,
                        "hash": herramienta_hash
                    }
                    notificaciones.append(notif)
        return notificaciones

    async def periodic_check(self):
        while True:
            try:
                if self.group_name not in active_connections or active_connections[self.group_name] != self:
                    break
                notificaciones = await self.check_herramientas()
                for notif in notificaciones:
                    await self.channel_layer.group_send(
                        self.group_name,
                        {
                            "type": "send_notification",
                            "message": notif["message"],
                            "notification_type": notif["notification_type"],
                            "timestamp": notif["timestamp"],
                            "herramienta_id": notif["herramienta_id"],
                            "actividad_id": notif.get("actividad_id"),
                            "hash": notif["hash"]
                        }
                    )
                await asyncio.sleep(300)
            except asyncio.CancelledError:
                break
            except Exception:
                await asyncio.sleep(300)