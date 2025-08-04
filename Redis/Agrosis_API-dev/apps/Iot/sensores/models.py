from django.db import models
from apps.Cultivo.bancal.models import Bancal

class TipoSensor(models.Model):
    nombre = models.CharField(max_length=50, unique=True)
    unidad_medida = models.CharField(max_length=10)
    medida_minima = models.DecimalField(max_digits=10, decimal_places=2)
    medida_maxima = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField(blank=True)

    def __str__(self):
        return self.nombre

class Sensor(models.Model):
    nombre = models.CharField(max_length=100)
    tipo_sensor = models.ForeignKey(
        TipoSensor,
        on_delete=models.PROTECT,
        related_name='sensores' 
    )
    descripcion = models.TextField(blank=True)
    bancal = models.ForeignKey(
        Bancal,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='sensores'
    )
    medida_minima = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    medida_maxima = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    estado = models.CharField(
        max_length=10,
        choices=[('activo', 'Activo'), ('inactivo', 'Inactivo')],
        default='inactivo'
    )
    device_code = models.CharField(
        max_length=100,
        null=True,
        blank=True,
        help_text="Código del dispositivo (p. ej. Arduino)."
    )

    def __str__(self):
        return self.nombre