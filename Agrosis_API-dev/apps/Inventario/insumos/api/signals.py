from django.db.models.signals import post_save
from django.dispatch import receiver
from apps.Inventario.insumos.models import Insumo
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from apps.Cultivo.Notificacion.models import Notification
from apps.Inventario.insumos.api.serializers import InsumoSerializer
from apps.Usuarios.usuarios.models import Usuarios
from django.utils import timezone

# Tu código de notificar_insumo_estado (ya proporcionado, está correcto)
def notificar_insumo_estado(insumo, usuarios_ids=None, previous_cantidad=None, previous_fecha_caducidad=None):
    serializer = InsumoSerializer(insumo)
    insumo_data = serializer.data
    
    nombre_insumo = insumo_data.get('nombre', 'Desconocido')
    cantidad = insumo_data.get('cantidad', 0)
    unidad_medida = insumo_data.get('unidad_medida', {}).get('nombre', 'Sin asignar')
    tipo_insumo = insumo_data.get('tipo_insumo', {}).get('nombre', 'Sin asignar')
    fecha_caducidad = insumo.fecha_caducidad
    umbral_cantidad = 10
    dias_caducidad = 7

    print(f"[DEBUG] Procesando insumo {insumo.id}: {nombre_insumo}")
    print(f"[DEBUG] Cantidad actual: {cantidad}, Fecha de caducidad: {fecha_caducidad}")
    print(f"[DEBUG] Previous cantidad: {previous_cantidad}, Previous fecha caducidad: {previous_fecha_caducidad}")

    if usuarios_ids is None:
        usuarios_ids = list(Usuarios.objects.filter(rol__in=[3, 4]).values_list('id', flat=True))
        print(f"[DEBUG] No se proporcionaron usuarios_ids, obteniendo administradores e instructores: {usuarios_ids}")
    
    usuarios_ids = list(set(usuarios_ids))
    
    usuarios_ids = [uid for uid in usuarios_ids if Usuarios.objects.filter(id=uid, rol__in=[3, 4]).exists()]
    if not usuarios_ids:
        print(f"[DEBUG] No hay administradores ni instructores válidos para notificar sobre insumo {insumo.id}")
        return

    print(f"[DEBUG] Usuarios finales a notificar: {usuarios_ids}")
    channel_layer = get_channel_layer()
    
    if cantidad <= umbral_cantidad and (previous_cantidad is None or previous_cantidad > umbral_cantidad):
        mensaje = (
            f"El insumo {nombre_insumo} está bajo de stock.\n"
            f"Cantidad actual: {cantidad} {unidad_medida}\n"
            f"Tipo de insumo: {tipo_insumo}\n"
        )
        print(f"[DEBUG] Enviando notificación INSUMO_AGOTADO para insumo {insumo.id} a usuarios: {usuarios_ids}")
        for user_id in usuarios_ids:
            if not Notification.objects.filter(
                recipient_id=user_id,
                notification_type='INSUMO_AGOTADO',
                data__insumo_id=insumo.id,
                created_at__gte=timezone.now() - timezone.timedelta(days=1)
            ).exists():
                notification = Notification.objects.create(
                    recipient_id=user_id,
                    notification_type='INSUMO_AGOTADO',
                    message=mensaje,
                    data={'insumo_id': insumo.id, 'insumo': insumo_data}
                )
                async_to_sync(channel_layer.group_send)(
                    f'user_{user_id}',
                    {
                        'type': 'send_notification',
                        'id': str(notification.id),
                        'notification_type': 'INSUMO_AGOTADO',
                        'message': mensaje,
                        'data': {'insumo_id': insumo.id, 'insumo': insumo_data},
                        'created_at': notification.created_at.isoformat(),
                    }
                )

    if fecha_caducidad:
        hoy = timezone.now().date()
        dias_para_caducar = (fecha_caducidad - hoy).days
        should_notify_caducidad = 0 < dias_para_caducar <= dias_caducidad
        if previous_fecha_caducidad:
            previous_dias = (previous_fecha_caducidad - hoy).days
            should_notify_caducidad = should_notify_caducidad and (
                previous_dias > dias_caducidad or 
                previous_dias <= 0 or 
                previous_fecha_caducidad != fecha_caducidad
            )
        if should_notify_caducidad:
            mensaje = (
                f"El insumo {nombre_insumo} está próximo a caducar.\n"
                f"Fecha de caducidad: {fecha_caducidad.strftime('%Y-%m-%d')}\n"
                f"Días restantes: {dias_para_caducar}\n"
                f"Tipo de insumo: {tipo_insumo}\n"
            )
            print(f"[DEBUG] Enviando notificación INSUMO_CADUCANDO para insumo {insumo.id} a usuarios: {usuarios_ids}")
            for user_id in usuarios_ids:
                if not Notification.objects.filter(
                    recipient_id=user_id,
                    notification_type='INSUMO_CADUCANDO',
                    data__insumo_id=insumo.id,
                    created_at__gte=timezone.now() - timezone.timedelta(days=1)
                ).exists():
                    notification = Notification.objects.create(
                        recipient_id=user_id,
                        notification_type='INSUMO_CADUCANDO',
                        message=mensaje,
                        data={'insumo_id': insumo.id, 'insumo': insumo_data}
                    )
                    async_to_sync(channel_layer.group_send)(
                        f'user_{user_id}',
                        {
                            'type': 'send_notification',
                            'id': str(notification.id),
                            'notification_type': 'INSUMO_CADUCANDO',
                            'message': mensaje,
                            'data': {'insumo_id': insumo.id, 'insumo': insumo_data},
                            'created_at': notification.created_at.isoformat(),
                        }
                    )

@receiver(post_save, sender=Insumo)
def handle_insumo_save(sender, instance, created, **kwargs):
    print(f"[DEBUG] Señal post_save disparada para Insumo {instance.id}, creado: {created}")
    previous_cantidad = getattr(instance, '_original_cantidad', None)
    previous_fecha_caducidad = getattr(instance, '_original_fecha_caducidad', None)
    
    print(f"[DEBUG] Insumo {instance.id} - Cantidad actual: {instance.cantidad}, Fecha caducidad actual: {instance.fecha_caducidad}")
    print(f"[DEBUG] Previous cantidad: {previous_cantidad}, Previous fecha caducidad: {previous_fecha_caducidad}")
    
    if created or previous_cantidad != instance.cantidad or previous_fecha_caducidad != instance.fecha_caducidad:
        print(f"[DEBUG] Insumo {instance.id} creado o cantidad/fecha_caducidad cambiados")
        notificar_insumo_estado(
            instance,
            previous_cantidad=previous_cantidad,
            previous_fecha_caducidad=previous_fecha_caducidad
        )