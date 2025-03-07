from django.db import models
from django.utils import timezone
from apps.Cultivo.bancal.models import Bancal
from apps.Iot.sensores.models import Sensores

class Datos_metereologicos(models.Model):
    fk_sensor = models.ForeignKey(Sensores, on_delete=models.SET_NULL, null=True)
    fk_bancal = models.ForeignKey(Bancal, on_delete=models.SET_NULL, null=True)
    valor_medicion = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)
    fecha_medicion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Nombre del sensor: {self.fk_sensor.nombre} Bancal: {self.fk_bancal}"