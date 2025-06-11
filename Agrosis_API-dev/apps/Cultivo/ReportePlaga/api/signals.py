from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json

def notificar_reporte_plaga(reporte_plaga, usuarios_ids=None):
    channel_layer = get_channel_layer()
    
    from apps.Cultivo.ReportePlaga.api.serializers import ReportePlagaSerializer
    serializer = ReportePlagaSerializer(reporte_plaga)
    reporte_data = serializer.data
    
    if usuarios_ids is None:
        usuarios_ids = [reporte_plaga.usuario.id]
    
    for user_id in usuarios_ids:
        async_to_sync(channel_layer.group_send)(
            f'plaga_user_{user_id}',
            {
                'type': 'send_notification',
                'data': {
                    'type': 'reporte_plaga',
                    'message': 'Nuevo reporte de plaga' if reporte_plaga.estado == 'PE' 
                             else 'Reporte de plaga actualizado',
                    'reporte': reporte_data,
                    'estado': reporte_plaga.estado
                }
            }
        )

def notificar_cambio_estado_plaga(reporte_plaga, usuarios_ids=None):
    channel_layer = get_channel_layer()
    
    from apps.Cultivo.ReportePlaga.api.serializers import ReportePlagaSerializer
    serializer = ReportePlagaSerializer(reporte_plaga)
    reporte_data = serializer.data
    
    if usuarios_ids is None:
        usuarios_ids = [reporte_plaga.usuario.id]
    
    for user_id in usuarios_ids:
        async_to_sync(channel_layer.group_send)(
            f'plaga_user_{user_id}',
            {
                'type': 'send_notification',
                'data': {
                    'type': 'cambio_estado_plaga',
                    'message': f'El estado del reporte ha cambiado a {reporte_plaga.get_estado_display()}',
                    'reporte': reporte_data,
                    'nuevo_estado': reporte_plaga.estado
                }
            }
        )