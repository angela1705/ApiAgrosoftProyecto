from django.db.models.signals import post_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from apps.Cultivo.actividades.models import Actividad

@receiver(post_save, sender=Actividad)
def notificar_asignacion_actividad(sender, instance, created, **kwargs):
    if created:
        channel_layer = get_channel_layer()
        grupo_usuario = f"user_{instance.usuario.id}"
        mensaje = f"Tienes una nueva actividad: {instance.tipo_actividad}"
        print(f"[SIGNAL] Enviando mensaje a {grupo_usuario}: {mensaje}")
        
        async_to_sync(channel_layer.group_send)(
            grupo_usuario,
            {
                "type": "send_notification",
                "message": mensaje,
            }
        )
