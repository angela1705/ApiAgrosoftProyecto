from django.db import models
from django.utils import timezone
from apps.Iot.sensores.models import Sensor
from apps.Cultivo.bancal.models import Bancal

class Datos_metereologicos(models.Model):
    fk_sensor = models.ForeignKey(
        Sensor,
        on_delete=models.SET_NULL,
        null=True,
        related_name='datos_meteorologicos'
    )
    fk_bancal = models.ForeignKey(
        Bancal,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='datos_meteorologicos'
    )
    temperatura = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    humedad_ambiente = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    luminosidad = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    lluvia = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    velocidad_viento = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    direccion_viento = models.DecimalField(max_digits=3, decimal_places=0, null=True, blank=True)
    humedad_suelo = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    ph_suelo = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    calidad_aire = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    fecha_medicion = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Sensor: {self.fk_sensor.nombre if self.fk_sensor else 'N/A'} - {self.fecha_medicion}"

    class Meta:
        db_table = 'datos_meteorologicos'

class DatosHistoricos(models.Model):
    fk_sensor = models.ForeignKey(
        Sensor,
        on_delete=models.SET_NULL,
        null=True,
        related_name='datos_historicos'
    )
    fk_bancal = models.ForeignKey(
        Bancal,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='datos_historicos'
    )
    temperatura = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    humedad_ambiente = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    luminosidad = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    lluvia = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    velocidad_viento = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    direccion_viento = models.DecimalField(max_digits=3, decimal_places=0, null=True, blank=True)
    humedad_suelo = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    ph_suelo = models.DecimalField(max_digits=4, decimal_places=2, null=True, blank=True)
    calidad_aire = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    fecha_promedio = models.DateTimeField()
    cantidad_mediciones = models.IntegerField(default=0)

    def __str__(self):
        return f"Promedio {self.fk_sensor.nombre if self.fk_sensor else 'N/A'} - {self.fecha_promedio}"

    class Meta:
        db_table = 'datos_historicos'