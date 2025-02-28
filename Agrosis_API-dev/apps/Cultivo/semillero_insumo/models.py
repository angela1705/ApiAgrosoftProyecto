from django.db import models

class SemilleroInsumo(models.Model):
    id_semillero = models.ForeignKey('semillero.Semillero', on_delete=models.CASCADE)  
    id_insumo = models.ForeignKey('insumos.Insumo', on_delete=models.CASCADE)  
    cantidad_necesaria = models.FloatField()
    id_bodega = models.ForeignKey('bodega.Bodega', on_delete=models.CASCADE) 
    def __str__(self):
        return f"Semillero: {self.id_semillero} - Insumo: {self.id_insumo}"
