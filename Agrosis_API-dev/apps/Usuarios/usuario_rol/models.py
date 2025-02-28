from django.db import models
from apps.Usuarios.usuarios.models import Usuarios
from apps.Usuarios.usuarios.models import Roles

class UsuarioRol(models.Model):
    usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    rol = models.ForeignKey(Roles, on_delete=models.CASCADE)

# Create your models here.
