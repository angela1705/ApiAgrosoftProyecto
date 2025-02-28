from django.db import models


class Permiso(models.Model):
    nombre = models.CharField(max_length=30)
    descripcion = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.nombre
# Create your models here.
