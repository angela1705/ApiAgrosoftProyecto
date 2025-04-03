from django.db import models


class Actividad(models.Model):
    tipo_actividad = models.ForeignKey('tipo_actividad.TipoActividad', on_delete=models.CASCADE)
    descripcion = models.TextField()
    fecha_inicio = models.DateTimeField()
    fecha_fin = models.DateTimeField()
    usuario = models.ForeignKey('usuarios.Usuarios', on_delete=models.CASCADE)
    cultivo = models.ForeignKey('cultivos.Cultivo', on_delete=models.CASCADE)
    insumo = models.ForeignKey('insumos.Insumo', on_delete=models.CASCADE)
    cantidadUsada = models.IntegerField(default=0,blank=False,null=False)

    def __str__(self):
        return self.tipo_actividad
