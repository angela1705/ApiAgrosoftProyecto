from rest_framework.routers import DefaultRouter
from apps.Usuarios.permisos.api.views import PermisosViewSet

PermisosRouter = DefaultRouter()
PermisosRouter.register(prefix='permisos', viewset=PermisosViewSet, basename='permisos')
