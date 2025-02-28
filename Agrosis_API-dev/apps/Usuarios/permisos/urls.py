from django.urls import path
from apps.Usuarios.permisos.api.views import views

urlpatterns = [
    path('', views.listar_permisos,name='listar_permisos'),
]