from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from apps.Cultivo.actividades.models import Actividad
import time
import hashlib

@receiver(post_save, sender=Actividad)
def notificar_asignacion_actividad(sender, instance, created, **kwargs):
    if not created:
        return

    channel_layer = get_channel_layer()
    timestamp = str(int(time.time() * 1000))
    activity_hash = hashlib.md5(f"{instance.id}{timestamp}".encode()).hexdigest()

    user_group_name = f"user_{instance.usuario.id}"
    user_message = {
        "type": "send_notification",
        "message": f"Tienes una nueva actividad:\n {instance.tipo_actividad.nombre}\n {instance.cultivo.nombre}",
        "timestamp": timestamp,
        "activity_id": instance.id,
        "hash": activity_hash
    }


    admin_message = {
        "type": "send_notification",
        "message": f"Nueva actividad asignada: {instance.tipo_actividad.nombre} para {instance.usuario.get_full_name()}",
        "timestamp": timestamp,
        "activity_id": instance.id,
        "hash": activity_hash
    }

    async_to_sync(channel_layer.group_send)(user_group_name, user_message)
    async_to_sync(channel_layer.group_send)("admin_group", admin_message)

@receiver(post_delete, sender=Actividad)
def notificar_eliminacion_actividad(sender, instance, **kwargs):
    channel_layer = get_channel_layer()
    timestamp = str(int(time.time() * 1000))
    activity_hash = hashlib.md5(f"del{instance.id}{timestamp}".encode()).hexdigest()

    user_group_name = f"user_{instance.usuario.id}"
    user_message = {
        "type": "send_notification",
        "message": f"Actividad eliminada: {instance.tipo_actividad.nombre}",
        "timestamp": timestamp,
        "hash": activity_hash
    }

    admin_message = {
        "type": "send_notification",
        "message": f"Actividad eliminada: {instance.tipo_actividad.nombre} (era de {instance.usuario.get_full_name()})",
        "timestamp": timestamp,
        "hash": activity_hash
    }

    async_to_sync(channel_layer.group_send)(user_group_name, user_message)
    async_to_sync(channel_layer.group_send)("admin_group", admin_message)