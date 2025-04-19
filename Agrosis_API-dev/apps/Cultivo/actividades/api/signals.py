from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import time
import hashlib
from apps.Cultivo.actividades.models import Actividad

@receiver(m2m_changed, sender=Actividad.usuarios.through)
def notificar_usuarios_asignados(sender, instance, action, pk_set, **kwargs):
    if action == "post_add":
        channel_layer = get_channel_layer()
        timestamp = str(int(time.time() * 1000))
        activity_hash = hashlib.md5(f"{instance.id}{timestamp}".encode()).hexdigest()

        for user_id in pk_set:
            user_group = f"user_{user_id}"
            user = instance.usuarios.get(pk=user_id)
            message = {
                "type": "send_notification",
                "message": f"Tienes una nueva actividad:\n {instance.tipo_actividad.nombre}\n {instance.cultivo.nombre}",
                "timestamp": timestamp,
                "activity_id": instance.id,
                "hash": activity_hash
            }
            async_to_sync(channel_layer.group_send)(user_group, message)

        usuario_principal = instance.usuarios.first()
        admin_message = {
            "type": "send_notification",
            "message": f"Nueva actividad asignada: {instance.tipo_actividad.nombre} para {usuario_principal.get_full_name() if usuario_principal else 'sin usuario asignado'}",
            "timestamp": timestamp,
            "activity_id": instance.id,
            "hash": activity_hash
        }
        async_to_sync(channel_layer.group_send)("admin_group", admin_message)


@receiver(post_save, sender=Actividad)
def descontar_insumos(sender, instance, created, **kwargs):
    if created:
        for prestamo_insumo in instance.prestamos_insumos.all():
            insumo = prestamo_insumo.insumo
            if prestamo_insumo.cantidad_usada > insumo.cantidad:
                raise ValueError(f"No hay suficiente stock del insumo {insumo.nombre}. Disponible: {insumo.cantidad}")
            insumo.cantidad -= prestamo_insumo.cantidad_usada
            insumo.save()
