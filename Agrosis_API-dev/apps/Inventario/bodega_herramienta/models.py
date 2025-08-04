from django.db import models
from apps.Inventario.bodega.models import Bodega
from apps.Inventario.herramientas.models import Herramienta
from apps.Usuarios.usuarios.models import Usuarios

class BodegaHerramienta(models.Model):
    id = models.AutoField(primary_key=True)
    bodega = models.ForeignKey(Bodega, on_delete=models.CASCADE, related_name="bodegas_herramientas")
    herramienta = models.ForeignKey(Herramienta, on_delete=models.CASCADE, related_name="herramientas_bodegas")
    cantidad = models.PositiveIntegerField(default=1)
    creador = models.ForeignKey(Usuarios, on_delete=models.SET_NULL, null=True, blank=True, related_name="bodega_herramientas_creadas")
    costo_total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    cantidad_prestada = models.PositiveIntegerField(default=0)

    def save(self, *args, **kwargs):
        # Capturar valores anteriores antes de guardar
        if self.pk:
            try:
                original = BodegaHerramienta.objects.get(pk=self.pk)
                self._original_cantidad = original.cantidad
                self._original_cantidad_prestada = original.cantidad_prestada
            except BodegaHerramienta.DoesNotExist:
                self._original_cantidad = None
                self._original_cantidad_prestada = None
        else:
            self._original_cantidad = None
            self._original_cantidad_prestada = None
        
        # Calcular costo_total
        if self.herramienta and self.herramienta.precio:
            self.costo_total = self.cantidad * self.herramienta.precio
        else:
            self.costo_total = 0.00
        
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.bodega.nombre if self.bodega else "Sin Bodega"} - {self.herramienta.nombre if self.herramienta else "Sin Herramienta"} ({self.cantidad} unidades)'

    class Meta:
        verbose_name = "Bodega Herramienta"
        verbose_name_plural = "Bodega Herramientas"