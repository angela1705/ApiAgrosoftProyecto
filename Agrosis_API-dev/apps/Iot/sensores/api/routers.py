from .views import SensoresViewset
from rest_framework.routers import DefaultRouter



SensoresRouter = DefaultRouter()
SensoresRouter.register(prefix='sensores',viewset=SensoresViewset,basename='sensores')

