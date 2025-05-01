from django.urls import re_path
from .consumers import BodegaHerramientaConsumer

websocket_urlpatterns = [
    re_path(r'ws/inventario/bodega_herramienta/(?P<user_id>\w+)/$', BodegaHerramientaConsumer.as_asgi()),
]