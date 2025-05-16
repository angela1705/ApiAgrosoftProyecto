from django.db import models
from django.core.exceptions import ValidationError
from apps.Inventario.insumos.models import UnidadMedida

class Venta(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    monto_entregado = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    cambio = models.DecimalField(max_digits=10, decimal_places=2, editable=False, default=0)

    def calcular_totales(self):
        total = sum(detalle.total for detalle in self.detalles.all())
        self.cambio = self.monto_entregado - total
        return total

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        total = self.calcular_totales()
        if self.monto_entregado < total:
            raise ValidationError(f"El monto entregado (${self.monto_entregado}) es menor al total (${total})")



class DetalleVenta(models.Model):
    venta = models.ForeignKey(Venta, on_delete=models.CASCADE, related_name="detalles")
    producto = models.ForeignKey('precio_producto.PrecioProducto', on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2, editable=False)
    unidades_de_medida = models.ForeignKey(UnidadMedida, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if self.cantidad <= 0:
            raise ValidationError("La cantidad debe ser mayor a cero.")
        if self.cantidad > self.producto.stock:
            raise ValidationError(f"Stock insuficiente. Disponible: {self.producto.stock}")

        self.total = self.producto.precio * self.cantidad
        self.producto.stock -= self.cantidad
        self.producto.save()

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.cantidad} x {self.producto} (${self.total})"



