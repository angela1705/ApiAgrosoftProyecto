from django.db import models

class Venta(models.Model):
    producto = models.ForeignKey('cultivos.Cultivo', on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2, editable=False)
    fecha = models.DateTimeField(auto_now_add=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)

    def save(self, *args, **kwargs):
        self.total = self.precio * self.cantidad
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Venta de {self.producto.nombre} ({self.cantidad} unidades)"

# Create your models here.
