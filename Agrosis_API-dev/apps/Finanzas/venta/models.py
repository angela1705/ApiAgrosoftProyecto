from django.db import models
from django.core.exceptions import ValidationError
from apps.Inventario.insumos.models import UnidadMedida

class Venta(models.Model):
    producto = models.ForeignKey('precio_producto.PrecioProducto', on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2, editable=False)
    fecha = models.DateTimeField()
    monto_entregado = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    cambio = models.DecimalField(max_digits=10, decimal_places=2, editable=False, default=0)
    unidades_de_medida = models.ForeignKey(UnidadMedida, on_delete=models.CASCADE, related_name="ventas")
    def save(self, *args, **kwargs):
        if not self.pk:  # Solo al crear
            if self.cantidad <= 0:
                raise ValidationError("La cantidad debe ser mayor a cero.")
            if self.cantidad > self.producto.stock:
                raise ValidationError(f"Stock insuficiente. Disponible: {self.producto.stock}")

            self.total = self.producto.precio * self.cantidad

            if self.monto_entregado < self.total:
                raise ValidationError(f"El monto entregado (${self.monto_entregado}) es menor al total (${self.total})")

            self.cambio = self.monto_entregado - self.total
            self.producto.stock -= self.cantidad
            self.producto.save()

        super().save(*args, **kwargs)

    def __str__(self):
        return (
            f"Venta de {self.producto.Producto} - {self.cantidad} {self.producto.unidad_medida} "
            f"(Total: ${self.total}, Entregado: ${self.monto_entregado}, Cambio: ${self.cambio})"
        )
