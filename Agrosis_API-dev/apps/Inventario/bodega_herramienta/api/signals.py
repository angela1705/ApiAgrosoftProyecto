from django.db.models.signals import post_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from apps.Inventario.bodega_herramienta.models import BodegaHerramienta
from apps.Cultivo.actividades.models import PrestamoHerramienta
from django.utils import timezone
import hashlib
import logging

logger = logging.getLogger(__name__)

@receiver(post_save, sender=BodegaHerramienta)
def notificar_cambio_herramienta(sender, instance, created, **kwargs):
    channel_layer = get_channel_layer()
    timestamp = str(int(timezone.now().timestamp() * 1000))
    herramienta_hash = hashlib.md5(f"{instance.id}{timestamp}".encode()).hexdigest()
    umbral_cantidad = 10

    try:
        user_id = instance.creador.id if instance.creador else 1
    except AttributeError:
        user_id = 1

    user_group_name = f"bodega_herramienta_user_{user_id}"
    admin_group_name = "bodega_herramienta_admin_group"

    action = "creado" if created else "actualizado"
    message_base = f"Herramienta {instance.herramienta.nombre} en {instance.bodega.nombre} {action}: {instance.cantidad} unidades."

    user_message = {
        "type": "send_notification",
        "message": message_base,
        "notification_type": "success" if created else "info",
        "timestamp": timestamp,
        "herramienta_id": instance.id,
        "hash": herramienta_hash
    }
    admin_message = {
        "type": "send_notification",
        "message": f"Herramienta {instance.herramienta.nombre} {action} por usuario ID {user_id}: {instance.cantidad} unidades.",
        "notification_type": "info",
        "timestamp": timestamp,
        "herramienta_id": instance.id,
        "hash": herramienta_hash
    }

    async_to_sync(channel_layer.group_send)(user_group_name, user_message)
    async_to_sync(channel_layer.group_send)(admin_group_name, admin_message)

    if instance.cantidad <= umbral_cantidad:
        low_stock_hash = hashlib.md5(f"{instance.id}low_stock{timestamp}".encode()).hexdigest()
        low_stock_message = {
            "type": "send_notification",
            "message": f"Herramienta {instance.herramienta.nombre} en {instance.bodega.nombre} está baja en stock: {instance.cantidad} unidades.",
            "notification_type": "warning",
            "timestamp": timestamp,
            "herramienta_id": instance.id,
            "hash": low_stock_hash
        }
        async_to_sync(channel_layer.group_send)(user_group_name, low_stock_message)
        async_to_sync(channel_layer.group_send)(admin_group_name, low_stock_message)

@receiver(post_save, sender=PrestamoHerramienta)
def notificar_prestamo_herramienta(sender, instance, created, **kwargs):
    channel_layer = get_channel_layer()
    timestamp = str(int(timezone.now().timestamp() * 1000))
    herramienta = instance.bodega_herramienta
    if not herramienta:
        logger.warning(f"No se encontró BodegaHerramienta para PrestamoHerramienta ID {instance.id}")
        return

    herramienta_hash = hashlib.md5(f"{herramienta.id}prestamo_{instance.id}{timestamp}".encode()).hexdigest()
    user_id = herramienta.creador.id if herramienta.creador else 1
    user_group_name = f"bodega_herramienta_user_{user_id}"
    admin_group_name = "bodega_herramienta_admin_group"

    if created and instance.entregada and not instance.devuelta:
        message = f"1 unidad de {herramienta.herramienta.nombre} prestada para actividad ID {instance.actividad_id} desde la bodega {herramienta.bodega.nombre}."
        notification_type = "info"
    elif instance.devuelta and not created:
        message = f"1 unidad de {herramienta.herramienta.nombre} devuelta de actividad ID {instance.actividad_id} a la bodega {herramienta.bodega.nombre}."
        notification_type = "info"
    else:
        return

    user_message = {
        "type": "send_notification",
        "message": message,
        "notification_type": notification_type,
        "timestamp": timestamp,
        "herramienta_id": herramienta.id,
        "actividad_id": instance.actividad_id,
        "hash": herramienta_hash
    }
    admin_message = {
        "type": "send_notification",
        "message": f"{message} (Usuario ID {user_id})",
        "notification_type": notification_type,
        "timestamp": timestamp,
        "herramienta_id": herramienta.id,
        "actividad_id": instance.actividad_id,
        "hash": herramienta_hash
    }

    async_to_sync(channel_layer.group_send)(user_group_name, user_message)
    async_to_sync(channel_layer.group_send)(admin_group_name, admin_message)