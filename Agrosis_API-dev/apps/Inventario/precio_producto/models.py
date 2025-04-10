from django.db import models
from apps.Cultivo.cosechas.models import Cosecha

class PrecioProducto(models.Model):
    cosecha = models.ForeignKey(Cosecha, on_delete=models.CASCADE, related_name="precios")
    unidad_medida_gramos = models.IntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_registro = models.DateField()

    def __str__(self):
        return f"{self.cosecha} - {self.precio}"