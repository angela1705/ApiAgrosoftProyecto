from django.urls import re_path
from apps.Cultivo.actividades.api.routing import websocket_urlpatterns as actividad_ws
from apps.Inventario.bodega_herramienta.api.routing import websocket_urlpatterns as herramienta_ws
from apps.Inventario.bodega_insumo.api.routing import websocket_urlpatterns as bodega_insumo_ws
from apps.Inventario.insumos.api.routing import websocket_urlpatterns as insumo_ws

websocket_urlpatterns = actividad_ws + insumo_ws + herramienta_ws + bodega_insumo_ws