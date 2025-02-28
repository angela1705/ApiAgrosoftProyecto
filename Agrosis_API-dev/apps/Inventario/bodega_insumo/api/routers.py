from rest_framework.routers import DefaultRouter
from .views import BodegaInsumoViewSet

bodegaInsumoRouter = DefaultRouter()
bodegaInsumoRouter.register(prefix='bodega_insumo', viewset=BodegaInsumoViewSet, basename='bodega_insumo')

urlpatterns = bodegaInsumoRouter.urls
