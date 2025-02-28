from rest_framework.routers import DefaultRouter
from apps.Cultivo.semillero_insumo.api.views import SemilleroInsumoViewSet
semilleroInsumoRouter = DefaultRouter()

semilleroInsumoRouter.register(prefix='semillero_insumo', viewset=SemilleroInsumoViewSet, basename='semillero_insumo')
