from django.urls import re_path
from apps.Cultivo.actividades.api.consumers import ActividadConsumer

websocket_urlpatterns = [
    re_path(r'^ws/actividad/(?P<user_id>\d+)/$', ActividadConsumer.as_asgi()),
]
