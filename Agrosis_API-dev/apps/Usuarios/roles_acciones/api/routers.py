from rest_framework.routers import DefaultRouter
from apps.Usuarios.roles_acciones.api.views import RolesAccionesViewSet

RolesAccionesRouter = DefaultRouter()
RolesAccionesRouter.register(prefix='roles_acciones', viewset=RolesAccionesViewSet, basename='roles_acciones')
