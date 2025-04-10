from django.db import models

class PrecioProducto(models.Model):
    cultivo = models.ForeignKey('cultivos.Cultivo', on_delete=models.CASCADE, null=True, blank=True)
    unidad_medida_gramos = models.IntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_registro = models.DateField()

    def __str__(self):
        return f"{self.cultivo} - {self.precio}"