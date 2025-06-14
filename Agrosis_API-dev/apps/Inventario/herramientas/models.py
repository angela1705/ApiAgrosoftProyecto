from django.db import models
from django.utils import timezone

class Herramienta(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    cantidad = models.IntegerField()
    estado = models.CharField(max_length=50)
    activo = models.BooleanField(default=True)
    fecha_registro = models.DateTimeField(default=timezone.now)
    precio = models.DecimalField(max_digits=10, decimal_places=0, default=0)

    def __str__(self):
        return self.nombre