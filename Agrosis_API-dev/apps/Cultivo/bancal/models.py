from django.db import models

class Bancal(models.Model):
    nombre = models.CharField(max_length=15, unique=True)
    tam_x = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    tam_y = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    latitud = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitud = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    lote = models.ForeignKey('lotes.Lote', on_delete=models.CASCADE)
    
    def __str__(self):
        return self.nombre
