from rest_framework.routers import DefaultRouter
from .views import BodegaHerramientaViewSet

bodegaHerramientaRouter = DefaultRouter()
bodegaHerramientaRouter.register(prefix='bodega_herramienta', viewset=BodegaHerramientaViewSet, basename='bodega_herramienta')

urlpatterns = bodegaHerramientaRouter.urls
