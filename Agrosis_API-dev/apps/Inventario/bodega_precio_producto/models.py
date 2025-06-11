from django.db import models
from apps.Inventario.bodega.models import Bodega
from apps.Inventario.precio_producto.models import PrecioProducto
from apps.Usuarios.usuarios.models import Usuarios

class BodegaPrecioProducto(models.Model):
    id = models.AutoField(primary_key=True)
    bodega = models.ForeignKey(Bodega, on_delete=models.CASCADE, related_name="bodegas_precios_productos")
    producto = models.ForeignKey(PrecioProducto, on_delete=models.CASCADE, related_name="productos_bodegas")
    precio = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    cantidad = models.PositiveIntegerField(default=0)
    creador = models.ForeignKey(Usuarios, on_delete=models.SET_NULL, null=True, blank=True, related_name="bodega_precios_productos_creados")

    def __str__(self):
        return f'{self.bodega.nombre if self.bodega else "Sin Bodega"} - {self.producto.nombre if self.producto else "Sin Producto"} (${self.precio:.2f}, Cantidad: {self.cantidad})'

    class Meta:
        verbose_name = "Bodega Precio Producto"
        verbose_name_plural = "Bodega Precios Productos"