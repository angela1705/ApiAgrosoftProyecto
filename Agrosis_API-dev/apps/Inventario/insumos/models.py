from django.db import models
from django.utils import timezone

class Insumo(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    cantidad = models.IntegerField()
    unidad_medida = models.CharField(max_length=50)
    activo = models.BooleanField(default=True)
    tipo_empacado = models.CharField(max_length=100, blank=True, null=True)
    fecha_registro = models.DateTimeField(default=timezone.now) 
    fecha_caducidad = models.DateField(blank=True, null=True)
    fecha_actualizacion = models.DateTimeField(auto_now=True)
    precio_insumo = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return self.nombre