from django.db import models

class Venta(models.Model):
    cantidad = models.PositiveIntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2, editable=False)
    fecha = models.DateTimeField(auto_now_add=True)
    fk_cosecha = models.ForeignKey('cosechas.Cosecha', on_delete=models.CASCADE, null=True, blank=True)  # Agrega null=True y blank=True

    def save(self, *args, **kwargs):
        if self.fk_cosecha:  # Verifica si fk_cosecha existe
            self.total = self.cantidad * self.fk_cosecha.cantidad  # Placeholder, ajusta según tu lógica
        else:
            self.total = 0  # O ajusta según tu lógica si fk_cosecha es None
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Venta de {self.producto.nombre} ({self.cantidad} unidades) - Cosecha {self.fk_cosecha.fecha if self.fk_cosecha else 'Sin cosecha'}"

# Create your models here.