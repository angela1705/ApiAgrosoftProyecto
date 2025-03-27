from django.db import models
from django.utils import timezone
from apps.Cultivo.bancal.models import Bancal
from apps.Iot.sensores.models import Sensores

class Datos_metereologicos(models.Model):
    fk_sensor = models.ForeignKey(Sensores, on_delete=models.SET_NULL, null=True)
    fk_bancal = models.ForeignKey(Bancal, on_delete=models.SET_NULL, null=True)
    temperature = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    humidity = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    fecha_medicion = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Sensor: {self.fk_sensor.nombre} - {self.fecha_medicion}"