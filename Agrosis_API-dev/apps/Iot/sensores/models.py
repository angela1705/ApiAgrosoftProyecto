from django.db import models

# Create your models here.
class Sensores(models.Model):
    nombre = models.CharField(max_length=50)
    tipo_sensor = models.CharField(max_length=50)
    unidad_medida = models.CharField(max_length=50)
    descripcion = models.TextField()
    medida_minima = models.IntegerField()
    medida_maxima = models.IntegerField()

    def str(self):
        return self.nombre