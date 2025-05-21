import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from ..models import Insumo
from django.utils import timezone
import hashlib

User = get_user_model()

class InsumoConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = self.scope['url_route']['kwargs'].get('user_id')
        if not self.user_id:
            print("No user_id provided, closing connection")
            await self.close()
            return

        if self.user_id == 'admin':
            self.room_group_name = 'insumo_admin_group'
        else:
            try:
                self.user_id = int(self.user_id)
                user_exists = await self.check_user_exists(self.user_id)
                if not user_exists:
                    print(f"User {self.user_id} does not exist, closing connection")
                    await self.close()
                    return
                self.room_group_name = f'insumo_user_{self.user_id}'
            except (ValueError, TypeError) as e:
                print(f"Invalid user_id: {e}, closing connection")
                await self.close()
                return

        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        print(f"WebSocket conectado para {self.room_group_name}")

        await self.send_initial_notifications()

    async def disconnect(self, close_code):
        if hasattr(self, 'room_group_name'):
            await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
        print(f"WebSocket desconectado para {self.room_group_name}, código: {close_code}")

    @database_sync_to_async
    def check_user_exists(self, user_id):
        return User.objects.filter(id=user_id).exists()

    @database_sync_to_async
    def check_insumos(self):
        insumos = Insumo.objects.filter(activo=True)
        notifications = []
        today = timezone.now().date()
        umbral_cantidad = 10
        umbral_dias = 7
        timestamp = str(int(timezone.now().timestamp() * 1000))

        for insumo in insumos:
            if insumo.cantidad <= umbral_cantidad:
                insumo_hash = hashlib.md5(f"{insumo.id}low_stock".encode()).hexdigest()
                notifications.append({
                    'id': insumo_hash,
                    'type': 'low_stock',
                    'message': f"El insumo {insumo.nombre} está bajo en stock: {insumo.cantidad} {insumo.unidad_medida} restantes.",
                    'timestamp': timestamp,
                    'insumo_id': insumo.id,
                    'source': 'bodega'
                })
            if insumo.fecha_caducidad and (insumo.fecha_caducidad - today).days <= umbral_dias:
                insumo_hash = hashlib.md5(f"{insumo.id}expiring".encode()).hexdigest()
                notifications.append({
                    'id': insumo_hash,
                    'type': 'expiring',
                    'message': f"El insumo {insumo.nombre} está próximo a vencer: {insumo.fecha_caducidad}.",
                    'timestamp': timestamp,
                    'insumo_id': insumo.id,
                    'source': 'bodega'
                })
        return notifications

    async def send_initial_notifications(self):
        try:
            notifications = await self.check_insumos()
            for notif in notifications:
                await self.send_notification({'data': notif})
        except Exception as e:
            print(f"Error in send_initial_notifications: {e}")

    async def send_notification(self, event):
        try:
            await self.send(text_data=json.dumps(event['data']))
            print(f"Notificación enviada: {event['data']}")
        except Exception as e:
            print(f"Error sending notification: {e}")