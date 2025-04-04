from django.db import models


class Actividad(models.Model):
    ESTADO_CHOICES = [
        ('PENDIENTE', 'Pendiente'),
        ('EN_PROCESO', 'En proceso'),
        ('COMPLETADA', 'Completada'),
        ('CANCELADA', 'Cancelada'),
    ]
    
    tipo_actividad = models.ForeignKey('tipo_actividad.TipoActividad', on_delete=models.CASCADE)
    descripcion = models.TextField()
    fecha_inicio = models.DateTimeField()
    fecha_fin = models.DateTimeField()
    usuario = models.ForeignKey('usuarios.Usuarios', on_delete=models.CASCADE)
    cultivo = models.ForeignKey('cultivos.Cultivo', on_delete=models.CASCADE)
    insumo = models.ForeignKey('insumos.Insumo', on_delete=models.CASCADE)
    cantidadUsada = models.IntegerField(default=0, blank=False, null=False)
    estado = models.CharField(
        max_length=20,
        choices=ESTADO_CHOICES,
        default='PENDIENTE'
    )
    prioridad = models.CharField(
        max_length=20,
        choices=[('ALTA', 'Alta'), ('MEDIA', 'Media'), ('BAJA', 'Baja')],
        default='MEDIA'
    )
    instrucciones_adicionales = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.tipo_actividad} - {self.estado}"