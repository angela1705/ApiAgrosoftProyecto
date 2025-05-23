from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from django.db.models.signals import post_save
from django.dispatch import receiver
from ..models import Insumo
import hashlib
from django.utils import timezone
import json

# Caché en memoria para notificaciones
NOTIFICATION_CACHE = {}  # {user_id: {notification_id: notification_data}}

@receiver(post_save, sender=Insumo)
def notify_stock_change(sender, instance, **kwargs):
    channel_layer = get_channel_layer()
    today = timezone.now().date()
    umbral_cantidad = 10
    umbral_dias = 7
    notifications = []
    timestamp = str(int(timezone.now().timestamp() * 1000))

    # Usar el contexto de la solicitud para obtener el usuario autenticado
    # Esto depende de cómo se activa el post_save (p.ej., desde InsumoViewSet)
    # Por ahora, usamos un user_id por defecto (1) si no hay contexto
    user_id = getattr(instance, '_user_id', 1)  # Ajusta según tu sistema

    if instance.activo:
        if instance.cantidad <= umbral_cantidad:
            insumo_hash = hashlib.md5(f"{instance.id}low_stock".encode()).hexdigest()
            if user_id not in NOTIFICATION_CACHE or insumo_hash not in NOTIFICATION_CACHE.get(user_id, {}):
                notification = {
                    'id': insumo_hash,
                    'type': 'low_stock',
                    'message': f"El insumo {instance.nombre} está bajo en stock: {instance.cantidad} {instance.unidad_medida} restantes.",
                    'timestamp': timestamp,
                    'insumo_id': instance.id,
                    'source': 'bodega'
                }
                if user_id not in NOTIFICATION_CACHE:
                    NOTIFICATION_CACHE[user_id] = {}
                NOTIFICATION_CACHE[user_id][insumo_hash] = notification
                notifications.append(notification)

        if instance.fecha_caducidad and (instance.fecha_caducidad - today).days <= umbral_dias:
            insumo_hash = hashlib.md5(f"{instance.id}expiring".encode()).hexdigest()
            if user_id not in NOTIFICATION_CACHE or insumo_hash not in NOTIFICATION_CACHE.get(user_id, {}):
                notification = {
                    'id': insumo_hash,
                    'type': 'expiring',
                    'message': f"El insumo {instance.nombre} está próximo a vencer: {instance.fecha_caducidad}.",
                    'timestamp': timestamp,
                    'insumo_id': instance.id,
                    'source': 'bodega'
                }
                if user_id not in NOTIFICATION_CACHE:
                    NOTIFICATION_CACHE[user_id] = {}
                NOTIFICATION_CACHE[user_id][insumo_hash] = notification
                notifications.append(notification)

    for notif in notifications:
        async_to_sync(channel_layer.group_send)(
            f'insumo_user_{user_id}',
            {
                'type': 'send_notification',
                'data': notif
            }
        )