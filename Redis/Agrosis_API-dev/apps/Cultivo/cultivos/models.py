from django.db import models
from apps.Inventario.insumos.models import UnidadMedida
class Cultivo(models.Model):
    Especie = models.ForeignKey('especies.Especie', on_delete=models.CASCADE)
    Bancal = models.ForeignKey('bancal.Bancal', on_delete=models.CASCADE)
    nombre = models.CharField(max_length=50, unique=True)
    unidad_de_medida = models.ForeignKey(UnidadMedida, on_delete=models.CASCADE)
    activo = models.BooleanField()
    fechaSiembra = models.DateField()

    def __str__(self):
        return self.nombre
