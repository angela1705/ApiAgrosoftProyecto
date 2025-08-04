from django.urls import re_path
from apps.Iot.datos_meteorologicos.api.consumer import RealtimeDataConsumer
from apps.Cultivo.Notificacion.api.routing import websocket_urlpatterns as notificacion_ws


meteo_ws = [
    re_path(r"ws/realtime/$", RealtimeDataConsumer.as_asgi()),
]

websocket_urlpatterns = meteo_ws + notificacion_ws 