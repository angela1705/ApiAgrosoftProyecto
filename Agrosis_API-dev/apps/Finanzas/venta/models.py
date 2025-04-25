from django.db import models
from django.core.exceptions import ValidationError

class Venta(models.Model):
    producto = models.ForeignKey('precio_producto.PrecioProducto', on_delete=models.CASCADE)
    cantidad = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2, editable=False)
    fecha = models.DateTimeField()

    def save(self, *args, **kwargs):
        if not self.pk:
            if self.cantidad <= 0:
                raise ValueError("La cantidad debe ser mayor a cero.")
            unidad_medida = self.producto.unidad_medida
            if unidad_medida:
                if unidad_medida.nombre.lower() in ['unidades', 'unidad', 'pieza', 'piezas'] and not self.cantidad.is_integer():
                    raise ValidationError("La cantidad debe ser un número entero para esta unidad de medida.")
            if self.cantidad > self.producto.stock:
                raise ValueError(f"Stock insuficiente. Disponible: {self.producto.stock}")
            self.total = self.producto.precio * self.cantidad
            self.producto.stock -= self.cantidad
            self.producto.save()
        super().save(*args, **kwargs)

    def __str__(self):
        unidad = self.producto.unidad_medida.nombre if self.producto.unidad_medida else "sin unidad"
        return f"Venta de {self.producto.Producto} - {self.cantidad} {unidad} (Total: ${self.total})"

    class Meta:
        db_table = "ventas_venta"
        verbose_name = "Venta"
        verbose_name_plural = "Ventas"