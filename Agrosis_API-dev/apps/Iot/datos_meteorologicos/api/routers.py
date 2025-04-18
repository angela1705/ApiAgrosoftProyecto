from rest_framework.routers import DefaultRouter
from apps.Iot.datos_meteorologicos.api.views import DatosMeteorologicosViewSet, EvapotranspiracionViewSet

Datos_metereologicosRouter = DefaultRouter()
Datos_metereologicosRouter.register(r'datosmetereologicos', DatosMeteorologicosViewSet, basename='datosmetereologicos')
Datos_metereologicosRouter.register(r'evapotranspiracion', EvapotranspiracionViewSet, basename='evapotranspiracion')