from rest_framework.routers import DefaultRouter
from apps.Iot.evapotranspiracion.api.views import EvapotranspiracionViewSet

evapotranspiracionrouter = DefaultRouter()
evapotranspiracionrouter.register(prefix="evapotranspiracion",viewset=EvapotranspiracionViewSet,basename="evapotranspiracion")

urlpatterns = evapotranspiracionrouter.urls
