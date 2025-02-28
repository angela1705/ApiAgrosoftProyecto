from django.db import models
from apps.Usuarios.permisos.models import Permiso
from apps.Usuarios.usuarios.models import Roles

class RolPermiso(models.Model):
    rol = models.ForeignKey(Roles, on_delete=models.CASCADE)
    permiso = models.ForeignKey(Permiso, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('rol', 'permiso')

# Create your models here.
