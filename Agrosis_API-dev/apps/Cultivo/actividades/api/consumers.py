import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model

User = get_user_model()

class ActividadConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.last_notification_hash = None

    async def connect(self):
        self.user_id = self.scope['url_route']['kwargs'].get('user_id')
        
        if self.user_id == 'admin':
            self.group_name = "admin_group"
        else:
            try:
                self.user_id = int(self.user_id)
                if not await self.get_user(self.user_id):
                    await self.close(code=4001)
                    return
                
                self.group_name = f"user_{self.user_id}"
                await self.channel_layer.group_send(
                    self.group_name,
                    {
                        "type": "force_disconnect",
                        "message": "Nueva conexión establecida"
                    }
                )
            except (ValueError, TypeError):
                await self.close(code=4000)
                return

        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def force_disconnect(self, event):
        await self.close(code=4002)

    async def disconnect(self, close_code):
        if hasattr(self, 'group_name'):
            await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def send_notification(self, event):
        current_hash = hash(frozenset(event.items()))
        if current_hash == self.last_notification_hash:
            return
            
        self.last_notification_hash = current_hash
        await self.send(text_data=json.dumps({
            'message': event['message'],
            'type': event.get('type', 'info'),
            'timestamp': event.get('timestamp'),
            'activity_id': event.get('activity_id')
        }))

    @database_sync_to_async
    def get_user(self, user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None
        
        