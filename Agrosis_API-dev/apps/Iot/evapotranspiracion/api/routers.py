from rest_framework.routers import DefaultRouter
from apps.Iot.evapotranspiracion.api.views import EvapotranspiracionViewSet

router = DefaultRouter()
router.register(prefix='evapotranspiracion', viewset=EvapotranspiracionViewSet, basename='evapotranspiracion')

urlpatterns = router.urls