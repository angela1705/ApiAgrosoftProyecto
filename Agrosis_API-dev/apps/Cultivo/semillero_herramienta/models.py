from django.db import models

class SemilleroHerramienta(models.Model):
    semilla = models.ForeignKey('semillero.Semillero', on_delete=models.CASCADE)
    herramienta = models.ForeignKey('herramientas.Herramienta', on_delete=models.CASCADE)  
    cantidad_necesaria = models.FloatField()
    bodega = models.ForeignKey('bodega.Bodega', on_delete=models.CASCADE)  

    def __str__(self):
        return f"Semillero: {self.semilla} - Herramienta: {self.herramienta}"
