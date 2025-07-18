from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from apps.Cultivo.Notificacion.models import Notification
from apps.Inventario.insumos.api.serializers import InsumoSerializer
from apps.Usuarios.usuarios.models import Usuarios
from django.utils import timezone

def notificar_insumo_estado(insumo, usuarios_ids=None, previous_cantidad=None, previous_fecha_caducidad=None):
    serializer = InsumoSerializer(insumo)
    insumo_data = serializer.data
    
    nombre_insumo = insumo_data.get('nombre', 'Desconocido')
    cantidad = insumo_data.get('cantidad', 0)
    unidad_medida = insumo_data.get('unidad_medida', {}).get('nombre', 'Sin asignar')
    tipo_insumo = insumo_data.get('tipo_insumo', {}).get('nombre', 'Sin asignar')
    fecha_caducidad = insumo.fecha_caducidad
    umbral_cantidad = 10  # Umbral para considerar el insumo agotado o bajo
    dias_caducidad = 7    # Días para considerar que el insumo está próximo a caducar

    # Si no se proporcionan usuarios_ids, obtener administradores
    if usuarios_ids is None:
        usuarios_ids = list(Usuarios.objects.filter(rol=4).values_list('id', flat=True))
    
    # Eliminar duplicados
    usuarios_ids = list(set(usuarios_ids))
    
    # Verificar si los usuarios_ids son válidos (solo administradores)
    usuarios_ids = [uid for uid in usuarios_ids if Usuarios.objects.filter(id=uid, rol=4).exists()]
    if not usuarios_ids:
        print(f"[DEBUG] No hay administradores válidos para notificar sobre insumo {insumo.id}")
        return

    channel_layer = get_channel_layer()
    
    # Verificar si el insumo está agotado o bajo de stock
    if cantidad <= umbral_cantidad and (previous_cantidad is None or previous_cantidad > umbral_cantidad):
        mensaje = (
            f"El insumo {nombre_insumo} está bajo de stock.\n"
            f"Cantidad actual: {cantidad} {unidad_medida}\n"
            f"Tipo de insumo: {tipo_insumo}\n"
        )
        print(f"[DEBUG] Enviando notificación INSUMO_AGOTADO para insumo {insumo.id} a usuarios: {usuarios_ids}")
        for user_id in usuarios_ids:
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

    # Verificar si el insumo está próximo a caducar
    if fecha_caducidad:
        hoy = timezone.now().date()
        dias_para_caducar = (fecha_caducidad - hoy).days
        should_notify_caducidad = 0 < dias_para_caducar <= dias_caducidad
        if previous_fecha_caducidad:
            previous_dias = (previous_fecha_caducidad - hoy).days
            should_notify_caducidad = should_notify_caducidad and (previous_dias > dias_caducidad or previous_dias <= 0)
        if should_notify_caducidad:
            mensaje = (
                f"El insumo {nombre_insumo} está próximo a caducar.\n"
                f"Fecha de caducidad: {fecha_caducidad.strftime('%Y-%m-%d')}\n"
                f"Días restantes: {dias_para_caducar}\n"
                f"Tipo de insumo: {tipo_insumo}\n"
            )
            print(f"[DEBUG] Enviando notificación INSUMO_CADUCANDO para insumo {insumo.id} a usuarios: {usuarios_ids}")
            for user_id in usuarios_ids:
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