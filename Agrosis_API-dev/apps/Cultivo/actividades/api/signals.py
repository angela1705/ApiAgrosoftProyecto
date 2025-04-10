from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from apps.Cultivo.actividades.models import Actividad
from apps.Inventario.insumos.models import Insumo
import time
import hashlib


@receiver(pre_save, sender=Actividad)
def guardar_estado_anterior(sender, instance, **kwargs):
    try:
        
        actividad_anterior = Actividad.objects.get(id=instance.id)
        instance._cantidad_anterior = actividad_anterior.cantidadUsada
        instance._insumo_anterior = actividad_anterior.insumo
    except Actividad.DoesNotExist:
        
        instance._cantidad_anterior = 0
        instance._insumo_anterior = None

@receiver(post_save, sender=Actividad)
def notificar_y_descontar_insumo(sender, instance, created, **kwargs):
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

    
    if created:
        async_to_sync(channel_layer.group_send)(user_group_name, user_message)
        async_to_sync(channel_layer.group_send)("admin_group", admin_message)

    
    if instance.insumo and instance.cantidadUsada > 0:
        insumo = instance.insumo
        if instance.cantidadUsada > insumo.cantidad:
            raise ValueError(f"No hay suficiente stock del insumo {insumo.nombre}. Disponible: {insumo.cantidad}")

        if created:
            
            insumo.cantidad -= instance.cantidadUsada
        else:
            
            diferencia = instance.cantidadUsada - instance._cantidad_anterior
            if instance._insumo_anterior and instance._insumo_anterior != insumo:
                
                instance._insumo_anterior.cantidad += instance._cantidad_anterior
                instance._insumo_anterior.save()
                insumo.cantidad -= instance.cantidadUsada
            elif diferencia != 0:
                
                insumo.cantidad -= diferencia

        insumo.save()

@receiver(post_delete, sender=Actividad)
def notificar_eliminacion_y_revertir_insumo(sender, instance, **kwargs):
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

    
    if instance.insumo and instance.cantidadUsada > 0:
        insumo = instance.insumo
        insumo.cantidad += instance.cantidadUsada
        insumo.save()