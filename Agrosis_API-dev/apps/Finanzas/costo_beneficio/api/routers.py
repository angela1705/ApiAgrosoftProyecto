from rest_framework.routers import DefaultRouter
from apps.Finanzas.costo_beneficio.api.views import CostoBeneficioViewSet
from django.urls import path, include

BeneficioCostorouter = DefaultRouter()
BeneficioCostorouter.register(r'costos-beneficio', CostoBeneficioViewSet, basename='costos-beneficio')

urlpatterns = [
    path('', include(BeneficioCostorouter.urls)),
]
