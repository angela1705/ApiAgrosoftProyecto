from django.db.models.signals import post_save
from django.dispatch import receiver
from ..models import Insumo
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import hashlib
from django.utils import timezone
import json

@receiver(post_save, sender=Insumo)
def notify_stock_change(sender, instance, **kwargs):
    channel_layer = get_channel_layer()
    today = timezone.now().date()
    umbral_cantidad = 10
    umbral_dias = 7
    notifications = []
    timestamp = str(int(timezone.now().timestamp() * 1000))

    if instance.activo:
        if instance.cantidad <= umbral_cantidad:
            insumo_hash = hashlib.md5(f"{instance.id}low_stock{timestamp}".encode()).hexdigest()
            notifications.append({
                'id': insumo_hash,
                'type': 'low_stock',
                'message': f"El insumo {instance.nombre} está bajo en stock: {instance.cantidad} {instance.unidad_medida} restantes.",
                'timestamp': timestamp,
                'insumo_id': instance.id,
                'source': 'bodega'
            })
        if instance.fecha_caducidad and (instance.fecha_caducidad - today).days <= umbral_dias:
            insumo_hash = hashlib.md5(f"{instance.id}expiring{timestamp}".encode()).hexdigest()
            notifications.append({
                'id': insumo_hash,
                'type': 'expiring',
                'message': f"El insumo {instance.nombre} está próximo a vencer: {instance.fecha_caducidad}.",
                'timestamp': timestamp,
                'insumo_id': instance.id,
                'source': 'bodega'
            })

    for notif in notifications:
        
        async_to_sync(channel_layer.group_send)(
            f'insumo_user_{instance.created_by_id}',  
            {
                'type': 'send_notification',
                'data': notif
            }
        )