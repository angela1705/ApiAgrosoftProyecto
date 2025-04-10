from django.db import models

class PrecioProducto(models.Model):
    Producto = models.ForeignKey('cosechas.cosecha', on_delete=models.CASCADE, null=True, blank=True)
    unidad_medida_gramos = models.IntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_registro = models.DateField()
    stock = models.IntegerField(default=0)
    stock_disponible = models.IntegerField(default=0)  
    fecha_caducidad = models.DateField(null=True, blank=True)  

    def __str__(self):
        return f"{self.Producto} - {self.precio}"

    def save(self, *args, **kwargs):
        if self.pk is None:
            self.stock_disponible = self.stock
        if self.stock_disponible < 0:
            raise ValueError("El stock disponible no puede ser negativo.")
        if self.fecha_caducidad and self.fecha_registro and self.fecha_caducidad < self.fecha_registro:
            raise ValueError("La fecha de caducidad no puede ser anterior a la fecha de registro.")
        super().save(*args, **kwargs)