from django.db import models
from apps.Inventario.bodega.models import Bodega
from apps.Inventario.herramientas.models import Herramienta

class BodegaHerramienta(models.Model):
    id = models.AutoField(primary_key=True)
    bodega = models.ForeignKey(Bodega, on_delete=models.CASCADE)
    herramienta = models.ForeignKey(Herramienta, on_delete=models.CASCADE)
    cantidad = models.IntegerField()

    def __str__(self):
        return f'{self.bodega.nombre} - {self.herramienta.nombre}'
