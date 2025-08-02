from django.db.models.signals import post_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from apps.Cultivo.Notificacion.models import Notification
from apps.Inventario.bodega_herramienta.api.serializers import BodegaHerramientaSerializer
from apps.Usuarios.usuarios.models import Usuarios
from django.utils import timezone
from apps.Inventario.bodega_herramienta.models import BodegaHerramienta

def notificar_herramienta_estado(bodega_herramienta, usuarios_ids=None, previous_cantidad=None, previous_cantidad_prestada=None):
    serializer = BodegaHerramientaSerializer(bodega_herramienta)
    herramienta_data = serializer.data
    
    nombre_herramienta = bodega_herramienta.herramienta.nombre if bodega_herramienta.herramienta else 'Desconocido'
    cantidad = bodega_herramienta.cantidad
    cantidad_prestada = bodega_herramienta.cantidad_prestada
    bodega_nombre = bodega_herramienta.bodega.nombre if bodega_herramienta.bodega else 'Sin asignar'
    umbral_cantidad = 10  # Umbral para considerar el stock bajo

    print(f"[DEBUG] Procesando bodega_herramienta {bodega_herramienta.id}: {nombre_herramienta}")
    print(f"[DEBUG] Cantidad actual: {cantidad}, Cantidad prestada: {cantidad_prestada}")
    print(f"[DEBUG] Previous cantidad: {previous_cantidad}, Previous cantidad prestada: {previous_cantidad_prestada}")

    # Si no se proporcionan usuarios_ids, obtener administradores (rol=4)
    if usuarios_ids is None:
        usuarios_ids = list(Usuarios.objects.filter(rol=4).values_list('id', flat=True))
        print(f"[DEBUG] No se proporcionaron usuarios_ids, obteniendo administradores: {usuarios_ids}")
    
    # Eliminar duplicados
    usuarios_ids = list(set(usuarios_ids))
    
    # Verificar si los usuarios_ids son válidos (solo administradores)
    usuarios_ids = [uid for uid in usuarios_ids if Usuarios.objects.filter(id=uid, rol=4).exists()]
    if not usuarios_ids:
        print(f"[DEBUG] No hay administradores válidos para notificar sobre herramienta en bodega {bodega_herramienta.id}")
        return

    print(f"[DEBUG] Usuarios finales a notificar: {usuarios_ids}")
    channel_layer = get_channel_layer()
    
    # Verificar si la herramienta está en uso
    if cantidad_prestada > 0 and (previous_cantidad_prestada is None or previous_cantidad_prestada == 0):
        mensaje = (
            f"La herramienta {nombre_herramienta} está en uso.\n"
            f"Cantidad prestada: {cantidad_prestada}\n"
            f"Bodega: {bodega_nombre}\n"
        )
        print(f"[DEBUG] Enviando notificación HERRAMIENTA_EN_USO para herramienta en bodega {bodega_herramienta.id} a usuarios: {usuarios_ids}")
        for user_id in usuarios_ids:
            if not Notification.objects.filter(
                recipient_id=user_id,
                notification_type='HERRAMIENTA_EN_USO',
                data__bodega_herramienta_id=bodega_herramienta.id,
                created_at__gte=timezone.now() - timezone.timedelta(days=1)
            ).exists():
                notification = Notification.objects.create(
                    recipient_id=user_id,
                    notification_type='HERRAMIENTA_EN_USO',
                    message=mensaje,
                    data={'bodega_herramienta_id': bodega_herramienta.id, 'herramienta': herramienta_data}
                )
                async_to_sync(channel_layer.group_send)(
                    f'user_{user_id}',
                    {
                        'type': 'send_notification',
                        'id': str(notification.id),
                        'notification_type': 'HERRAMIENTA_EN_USO',
                        'message': mensaje,
                        'data': {'bodega_herramienta_id': bodega_herramienta.id, 'herramienta': herramienta_data},
                        'created_at': notification.created_at.isoformat(),
                    }
                )

    # Verificar si el stock de la herramienta está bajo
    if cantidad <= umbral_cantidad and (previous_cantidad is None or previous_cantidad > umbral_cantidad):
        mensaje = (
            f"La herramienta {nombre_herramienta} está baja de stock.\n"
            f"Cantidad actual: {cantidad}\n"
            f"Bodega: {bodega_nombre}\n"
        )
        print(f"[DEBUG] Enviando notificación HERRAMIENTA_BAJA_STOCK para herramienta en bodega {bodega_herramienta.id} a usuarios: {usuarios_ids}")
        for user_id in usuarios_ids:
            if not Notification.objects.filter(
                recipient_id=user_id,
                notification_type='HERRAMIENTA_BAJA_STOCK',
                data__bodega_herramienta_id=bodega_herramienta.id,
                created_at__gte=timezone.now() - timezone.timedelta(days=1)
            ).exists():
                notification = Notification.objects.create(
                    recipient_id=user_id,
                    notification_type='HERRAMIENTA_BAJA_STOCK',
                    message=mensaje,
                    data={'bodega_herramienta_id': bodega_herramienta.id, 'herramienta': herramienta_data}
                )
                async_to_sync(channel_layer.group_send)(
                    f'user_{user_id}',
                    {
                        'type': 'send_notification',
                        'id': str(notification.id),
                        'notification_type': 'HERRAMIENTA_BAJA_STOCK',
                        'message': mensaje,
                        'data': {'bodega_herramienta_id': bodega_herramienta.id, 'herramienta': herramienta_data},
                        'created_at': notification.created_at.isoformat(),
                    }
                )

@receiver(post_save, sender=BodegaHerramienta)
def manejar_notificacion_herramienta(sender, instance, created, **kwargs):
    print(f"[DEBUG] Señal post_save disparada para BodegaHerramienta {instance.id}, creado: {created}")
    previous_cantidad = getattr(instance, '_original_cantidad', None)
    previous_cantidad_prestada = getattr(instance, '_original_cantidad_prestada', None)
    
    print(f"[DEBUG] BodegaHerramienta {instance.id} - Cantidad actual: {instance.cantidad}, Cantidad prestada: {instance.cantidad_prestada}")
    print(f"[DEBUG] Previous cantidad: {previous_cantidad}, Previous cantidad prestada: {previous_cantidad_prestada}")
    
    if created or previous_cantidad != instance.cantidad or previous_cantidad_prestada != instance.cantidad_prestada:
        print(f"[DEBUG] BodegaHerramienta {instance.id} creado o cantidad/cantidad_prestada cambiados")
        notificar_herramienta_estado(
            instance,
            previous_cantidad=previous_cantidad,
            previous_cantidad_prestada=previous_cantidad_prestada
        )