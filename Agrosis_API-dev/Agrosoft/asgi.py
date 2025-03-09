"""
ASGI config for Agrosis project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""
import os
import django
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Agrosoft.settings')
django.setup()

from apps.Iot.datos_meteorologicos.api.routers import websocket_urlpatterns as meteo_ws
from apps.Cultivo.actividades.api.routing import websocket_urlpatterns as actividad_ws
from apps.Inventario.bodega_herramienta.api.routing import websocket_urlpatterns as herramienta_ws
from apps.Inventario.bodega_insumo.api.routing import websocket_urlpatterns as insumo_ws

websocket_urlpatterns = meteo_ws + actividad_ws + herramienta_ws + insumo_ws

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(websocket_urlpatterns)
    ),
})