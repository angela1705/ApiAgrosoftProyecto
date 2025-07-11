from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from apps.Cultivo.Notificacion.models import Notification
from apps.Cultivo.ReportePlaga.api.serializers import ReportePlagaSerializer

def notificar_reporte_plaga(reporte_plaga, usuarios_ids=None):
    channel_layer = get_channel_layer()
    
    serializer = ReportePlagaSerializer(reporte_plaga)
    reporte_data = serializer.data
    
    if usuarios_ids is None:
        usuarios_ids = [reporte_plaga.usuario.id]
    
    mensaje = (
        f"Nuevo reporte de plaga: {reporte_plaga.plaga.nombre} en bancal {reporte_plaga.bancal.nombre}\n"
        f"Observaciones: {reporte_plaga.observaciones}\n"
        f"Estado: {reporte_plaga.get_estado_display()}"
    )
    
    for user_id in usuarios_ids:
        # Crear notificación en la base de datos
        notification = Notification.objects.create(
            recipient_id=user_id,
            notification_type='PEST_ALERT',
            message=mensaje,
            data={'reporte_plaga_id': reporte_plaga.id, 'reporte': reporte_data}
        )
        
        # Enviar notificación por WebSocket
        async_to_sync(channel_layer.group_send)(
            f'user_{user_id}',  # Usar el grupo existente
            {
                'type': 'send_notification',
                'id': str(notification.id),
                'notification_type': 'PEST_ALERT',
                'message': mensaje,
                'data': {'reporte_plaga_id': reporte_plaga.id, 'reporte': reporte_data},
                'created_at': notification.created_at.isoformat(),
            }
        )

def notificar_cambio_estado_plaga(reporte_plaga, usuarios_ids=None):
    channel_layer = get_channel_layer()
    
    serializer = ReportePlagaSerializer(reporte_plaga)
    reporte_data = serializer.data
    
    if usuarios_ids is None:
        usuarios_ids = [reporte_plaga.usuario.id]
    
    mensaje = (
        f"El estado del reporte de plaga {reporte_plaga.plaga.nombre} en bancal {reporte_plaga.bancal.nombre} "
        f"ha cambiado a {reporte_plaga.get_estado_display()}\n"
        f"Observaciones: {reporte_plaga.observaciones}"
    )
    
    for user_id in usuarios_ids:
        # Crear notificación en la base de datos
        notification = Notification.objects.create(
            recipient_id=user_id,
            notification_type='PEST_ALERT',
            message=mensaje,
            data={'reporte_plaga_id': reporte_plaga.id, 'reporte': reporte_data}
        )
        
        # Enviar notificación por WebSocket
        async_to_sync(channel_layer.group_send)(
            f'user_{user_id}',  # Usar el grupo existente
            {
                'type': 'send_notification',
                'id': str(notification.id),
                'notification_type': 'PEST_ALERT',
                'message': mensaje,
                'data': {'reporte_plaga_id': reporte_plaga.id, 'reporte': reporte_data},
                'created_at': notification.created_at.isoformat(),
            }
        )