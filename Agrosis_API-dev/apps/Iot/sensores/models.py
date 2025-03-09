from django.db import models

# Create your models here.
class Sensores(models.Model):
    nombre = models.CharField(max_length=50, default='')
    tipo_sensor = models.CharField(max_length=50, default='')
    unidad_medida = models.CharField(max_length=50, default='')
    descripcion = models.TextField(default='')
    medida_minima = models.IntegerField(default=0) 
    medida_maxima = models.IntegerField(default=0)  

    def __str__(self):
        return self.nombre
