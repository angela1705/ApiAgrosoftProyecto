from django.urls import re_path
from apps.Cultivo.ReportePlaga.api.consumer import PlagaNotificacionConsumer

websocket_urlpatterns = [
    re_path(r'ws/plagas/notificaciones/(?P<user_id>\d+)/$', PlagaNotificacionConsumer.as_asgi()),
]