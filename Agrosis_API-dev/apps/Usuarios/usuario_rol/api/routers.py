from rest_framework.routers import DefaultRouter
from apps.Usuarios.usuario_rol.api.views import UsuarioRolViewSet

UsuarioRolRouter = DefaultRouter()
UsuarioRolRouter.register(prefix='usuario_rol', viewset=UsuarioRolViewSet, basename='usuario_rol')
