from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
def notificar_reporte_plaga(reporte_plaga, usuarios_ids):
    channel_layer = get_channel_layer()
    
    from apps.Cultivo.ReportePlaga.api.serializers import ReportePlagaSerializer
    serializer = ReportePlagaSerializer(reporte_plaga)
    reporte_data = serializer.data
    
    for user_id in usuarios_ids:
        async_to_sync(channel_layer.group_send)(
            f'user_plaga_{user_id}',
            {
                'type': 'send_notification',
                'data': {
                    'type': 'reporte_plaga',
                    'message': 'Se ha reportado una nueva plaga',
                    'reporte': reporte_data
                }
            }
        )