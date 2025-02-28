from django.db import models


class Control(models.Model):
    id_afeccion = models.ForeignKey('afecciones.Afeccion', on_delete=models.CASCADE)
    id_tipoControl = models.ForeignKey('tipo_control.TipoControl', on_delete=models.CASCADE)
    id_producto = models.ForeignKey('productos_control.ProductoControl', on_delete=models.CASCADE)
    descripcion = models.TextField()
    fechaControl = models.DateField()

    def __str__(self):
        return f'{self.id_afeccion.nombre} - {self.id_producto.nombre}'
