from django.db import models

class PrecioProducto(models.Model):
    # Clave foránea a Especie (usando la app 'especie' y el modelo 'Especie')
    fk_especie = models.ForeignKey('especies.Especie', on_delete=models.CASCADE)
    
    # Campo precio como DecimalField con 10 dígitos en total y 2 decimales
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Campo fecha como DateField
    fecha = models.DateField()
    
    # Campo nombre como CharField con un máximo de 100 caracteres
    nombre = models.CharField(max_length=100)

    def __str__(self):
        # Devuelve una representación legible del objeto, incluyendo el nombre y el precio
        return f"{self.nombre} - ${self.precio} ({self.fecha})"

    class Meta:
        # Nombre de la tabla en la base de datos
        db_table = 'precio_producto'
        # Ordenar por fecha descendente
        ordering = ['-fecha']