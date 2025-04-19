from rest_framework.routers import DefaultRouter
from apps.Iot.datos_meteorologicos.api.views import DatosMeteorologicosViewSet, EvapotranspiracionViewSet

Datos_metereologicosRouter = DefaultRouter()
Datos_metereologicosRouter.register(prefix='datosmetereologicos', viewset=DatosMeteorologicosViewSet, basename='datosmetereologicos')
Datos_metereologicosRouter.register(prefix='evapotranspiracion', viewset=EvapotranspiracionViewSet, basename='evapotranspiracion')

urlpatterns = Datos_metereologicosRouter.urls