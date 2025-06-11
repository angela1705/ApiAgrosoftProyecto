import os
import django
import asyncio
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Agrosoft.settings')
django.setup()
 
import Agrosoft.routing
from apps.Iot.datos_meteorologicos.tasks import start_background_task
 
application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(Agrosoft.routing.websocket_urlpatterns)
    ),
})
 
async def startup():
    asyncio.create_task(start_background_task())
    print("Tarea de procesamiento de datos históricos iniciada en segundo plano")
 
loop = asyncio.get_event_loop()
loop.run_until_complete(startup())