from django.db import models
from apps.Usuarios.usuarios.models import Roles



class Accion(models.Model):
    nombre = models.CharField(max_length=100)

class RolAccion(models.Model):
    rol = models.ForeignKey(Roles, on_delete=models.CASCADE)
    accion = models.ForeignKey(Accion, on_delete=models.CASCADE)

# Create your models here.
