from django.db import models

class Lote(models.Model):
    nombre = models.CharField(max_length=15, unique=True)
    descripcion = models.TextField(null=True, blank=True)
    activo = models.BooleanField()
    tam_x = models.DecimalField(max_digits=5, decimal_places=2)
    tam_y = models.DecimalField(max_digits=5, decimal_places=2)
    latitud = models.DecimalField(max_digits=9, decimal_places=6)
    longitud = models.DecimalField(max_digits=9, decimal_places=6)

    def __str__(self):
        return self.nombre
