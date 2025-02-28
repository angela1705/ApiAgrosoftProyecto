from django.contrib.auth.models import AbstractUser
from django.db import models
from apps.Usuarios.roles.models import Roles

class Usuarios(AbstractUser): 
    rol = models.ForeignKey(Roles, on_delete=models.SET_NULL, null=True)
    nombre = models.CharField(max_length=30)
    apellido = models.CharField(max_length=30)
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email' 
    REQUIRED_FIELDS = ['username', 'nombre', 'apellido'] 
    def __str__(self):
        return f"{self.nombre} {self.apellido}"