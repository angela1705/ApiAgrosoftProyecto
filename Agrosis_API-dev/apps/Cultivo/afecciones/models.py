from django.db import models


class Afeccion(models.Model):
    id_plantacion = models.ForeignKey('plantaciones.Plantacion', on_delete=models.CASCADE)
    id_plaga = models.ForeignKey('plagas.Plaga', on_delete=models.CASCADE)
    nombre = models.CharField(max_length=30, unique=True)
    descripcion = models.TextField()
    fechaDeteccion = models.DateField()
    estado = models.CharField(max_length=2, choices=[('ST', 'Estable'), ('EC', 'En Control'), ('EL', 'Eliminada')])

    def __str__(self):
        return self.nombre
