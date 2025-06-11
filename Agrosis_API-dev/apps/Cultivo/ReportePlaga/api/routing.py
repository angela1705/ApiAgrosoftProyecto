from django.urls import re_path
from apps.Cultivo.ReportePlaga.api.consumer import ReportePlagaNotificacionConsumer

websocket_urlpatterns = [
    re_path(r'ws/reportes-plagas/notificaciones/(?P<user_id>\d+)/$', 
            ReportePlagaNotificacionConsumer.as_asgi()),
]