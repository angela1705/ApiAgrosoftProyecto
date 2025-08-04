from channels.generic.websocket import AsyncWebsocketConsumer
import json
from channels.db import database_sync_to_async
from apps.Usuarios.usuarios.models import Usuarios
from apps.Cultivo.Notificacion.models import Notification

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = self.scope['url_route']['kwargs'].get('user_id')
        if not self.user_id:
            await self.close()
            return

        user_exists = await self.check_user_exists(self.user_id)
        if not user_exists:
            await self.close()
            return

        self.group_name = f'user_{self.user_id}'
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        if hasattr(self, 'group_name'):
            await self.channel_layer.group_discard(self.group_name, self.channel_name)

    @database_sync_to_async
    def check_user_exists(self, user_id):
        return Usuarios.objects.filter(id=user_id).exists()

    async def receive(self, text_data):
        data = json.loads(text_data)
        if data.get('action') == 'mark_read':
            await self.mark_notification_read(data.get('notification_id'))

    async def send_notification(self, event):
        await self.send(text_data=json.dumps({
            'id': event['id'],
            'type': event['notification_type'],  # Cambiado de 'type' a 'notification_type'
            'message': event['message'],
            'data': event['data'],
            'created_at': event['created_at'],
        }))

    @database_sync_to_async
    def mark_notification_read(self, notification_id):
        try:
            notification = Notification.objects.get(id=notification_id, recipient__id=self.user_id)
            notification.is_read = True
            notification.save()
        except Notification.DoesNotExist:
            pass