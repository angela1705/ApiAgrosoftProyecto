from rest_framework.routers import DefaultRouter
from .views import HerramientaViewSet

herramientaRouter = DefaultRouter()
herramientaRouter.register(prefix='herramienta', viewset=HerramientaViewSet, basename='herramienta')

urlpatterns = herramientaRouter.urls
