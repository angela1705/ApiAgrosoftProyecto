from rest_framework.routers import DefaultRouter
from apps.Cultivo.calendario.api.views import CalendarioViewSet

calendarioRouter = DefaultRouter()
calendarioRouter.register(prefix='eventos', viewset=CalendarioViewSet, basename='eventos')
