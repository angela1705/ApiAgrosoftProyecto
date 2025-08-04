from rest_framework.routers import DefaultRouter
from apps.mapa.api.views import PuntoMapaViewSet

maparouter = DefaultRouter()
maparouter.register(prefix="puntos", viewset=PuntoMapaViewSet, basename="puntos")

urlpatterns = maparouter.urls
