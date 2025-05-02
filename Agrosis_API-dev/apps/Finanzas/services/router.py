from rest_framework.routers import DefaultRouter
from apps.Finanzas.services.views import CostoBeneficioViewSet

costo_beneficio_router = DefaultRouter()
costo_beneficio_router.register(
    prefix='costo-beneficio', 
    viewset=CostoBeneficioViewSet, 
    basename='costo-beneficio'
)

urlpatterns = costo_beneficio_router.urls