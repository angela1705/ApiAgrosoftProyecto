from rest_framework.routers import DefaultRouter
from apps.Usuarios.rol_permiso.api.views import RolPermisoViewSet

RolPermisoRouter = DefaultRouter()
RolPermisoRouter.register(prefix='rol_permiso', viewset=RolPermisoViewSet, basename='rol_permiso')
