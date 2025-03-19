from .views import Datos_metereologicosViewset
from rest_framework.routers import DefaultRouter
from django.urls import re_path
from apps.Iot.datos_meteorologicos.api.consumer import DatosMeteorologicosConsumer , RealtimeDataConsumer
Datos_metereologicosRouter = DefaultRouter()

Datos_metereologicosRouter.register(prefix='datosmetereologicos',viewset=Datos_metereologicosViewset,basename='datosmetereologicos')


websocket_urlpatterns = [
    re_path(r"ws/meteo/$", DatosMeteorologicosConsumer.as_asgi()),
    re_path(r"ws/realtime/$", RealtimeDataConsumer.as_asgi()),
]