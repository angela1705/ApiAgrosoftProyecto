from django.db import models
from apps.Usuarios.roles.models import Roles

class Salario(models.Model):
    rol = models.ForeignKey(Roles, on_delete=models.CASCADE, related_name='salarios')
    fecha_de_implementacion = models.DateField()
    valorJornal = models.DecimalField(max_digits=10, decimal_places=2)
    activo = models.BooleanField(default=True)

    class Meta:
        unique_together = ('rol', 'fecha_de_implementacion')
        ordering = ['-fecha_de_implementacion']

    def __str__(self):
        return f"{self.rol.nombre} - ${self.valorJornal} (desde {self.fecha_de_implementacion})"