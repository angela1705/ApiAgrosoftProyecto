from django.db import models
from django.utils import timezone

class PuntoMapa(models.Model):
    nombre = models.CharField(max_length=100)
    latitud = models.DecimalField(max_digits=9, decimal_places=6)
    longitud = models.DecimalField(max_digits=9, decimal_places=6)
    creado = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.nombre} ({self.latitud}, {self.longitud})"
