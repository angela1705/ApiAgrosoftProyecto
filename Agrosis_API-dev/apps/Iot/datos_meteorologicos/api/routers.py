from rest_framework.routers import DefaultRouter
from apps.Iot.datos_meteorologicos.api.views import DatosMeteorologicosViewSet, EvapotranspiracionViewSet
 
DatosMeteorologicosRouter = DefaultRouter()
DatosMeteorologicosRouter.register(prefix='datosmeteorologicos', viewset=DatosMeteorologicosViewSet, basename='datosmeteorologicos')
DatosMeteorologicosRouter.register(prefix='evapotranspiracion', viewset=EvapotranspiracionViewSet, basename='evapotranspiracion')

urlpatterns = DatosMeteorologicosRouter.urls