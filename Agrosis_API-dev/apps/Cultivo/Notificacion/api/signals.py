from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from apps.Cultivo.Notificacion.models import Notification

def send_notification(recipient_ids, notification_type, message, data=None):
    channel_layer = get_channel_layer()
    
    for user_id in recipient_ids:
        # Crear notificación en la base de datos
        notification = Notification.objects.create(
            recipient_id=user_id,
            notification_type=notification_type,
            message=message,
            data=data or {}
        )
        
        # Enviar notificación por WebSocket
        async_to_sync(channel_layer.group_send)(
            f'user_{user_id}',
            {
                'type': 'send_notification',  # Método del consumidor
                'id': str(notification.id),  # Convertir a string para JSON
                'notification_type': notification_type,  # Cambiado de 'type' a 'notification_type'
                'message': message,
                'data': data or {},
                'created_at': notification.created_at.isoformat(),
            }
        )