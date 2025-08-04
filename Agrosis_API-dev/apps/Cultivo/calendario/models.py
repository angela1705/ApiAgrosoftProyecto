from django.db import models
from apps.Usuarios.usuarios.models import Usuarios
class Calendario(models.Model):
    titulo = models.CharField(max_length=255, verbose_name="Título")
    usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE, verbose_name="Usuario")
    inicio = models.DateTimeField(verbose_name="Fecha y hora de inicio")
    todo_el_dia = models.BooleanField(default=False, verbose_name="Todo el día")
    color_fondo = models.CharField(max_length=7, verbose_name="Color de fondo") 
    descripcion = models.TextField(blank=True, null=True, verbose_name="Descripción")
    creado_en = models.DateTimeField(auto_now_add=True, verbose_name="Creado en")
    actualizado_en = models.DateTimeField(auto_now=True, verbose_name="Actualizado en")

    def __str__(self):
        return self.titulo

