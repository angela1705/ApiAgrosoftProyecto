from django.db.models.signals import post_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from ..models import Insumo
import time
import hashlib
from django.utils import timezone  

@receiver(post_save, sender=Insumo)
def notificar_cambio_insumo(sender, instance, created, **kwargs):
    channel_layer = get_channel_layer()
    timestamp = str(int(time.time() * 1000))
    insumo_hash = hashlib.md5(f"{instance.id}{timestamp}".encode()).hexdigest()

    umbral_cantidad = 10
    umbral_dias = 7       
    today = timezone.now().date() 

    
    user_group_name = f"insumo_user_{instance.id}"
    admin_group_name = "insumo_admin_group"

    if instance.cantidad <= umbral_cantidad:
        user_message = {
            "type": "send_notification",
            "message": f"El insumo {instance.nombre} está bajo en stock: {instance.cantidad} {instance.unidad_medida} restantes.",
            "timestamp": timestamp,
            "insumo_id": instance.id,
            "hash": insumo_hash
        }
        admin_message = {
            "type": "send_notification",
            "message": f"Insumo {instance.nombre} bajo en stock: {instance.cantidad} {instance.unidad_medida} restantes.",
            "timestamp": timestamp,
            "insumo_id": instance.id,
            "hash": insumo_hash
        }
        async_to_sync(channel_layer.group_send)(user_group_name, user_message)
        async_to_sync(channel_layer.group_send)(admin_group_name, admin_message)

    if instance.fecha_caducidad and (instance.fecha_caducidad - today).days <= umbral_dias:
        user_message = {
            "type": "send_notification",
            "message": f"El insumo {instance.nombre} está próximo a vencer: {instance.fecha_caducidad}.",
            "timestamp": timestamp,
            "insumo_id": instance.id,
            "hash": insumo_hash
        }
        admin_message = {
            "type": "send_notification",
            "message": f"Insumo {instance.nombre} próximo a vencer: {instance.fecha_caducidad}.",
            "timestamp": timestamp,
            "insumo_id": instance.id,
            "hash": insumo_hash
        }
        async_to_sync(channel_layer.group_send)(user_group_name, user_message)
        async_to_sync(channel_layer.group_send)(admin_group_name, admin_message)