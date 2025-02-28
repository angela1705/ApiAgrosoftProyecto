from rest_framework.routers import DefaultRouter
from apps.Cultivo.semillero_herramienta.api.views import SemilleroHerramientaViewSet

semilleroHRouter = DefaultRouter()
semilleroHRouter.register(prefix='semillero_herramienta', viewset=SemilleroHerramientaViewSet, basename='semillero_herramienta')
