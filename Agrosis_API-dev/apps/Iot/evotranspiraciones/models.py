from django.db import models
from apps.Cultivo.lotes.models import Lote
# Create your models here.

class Evapotranspiraciones(models.Model):
    fk_lote = models.ForeignKey(Lote,on_delete=models.SET_NULL,null=True)
    milimetrosMCuadrado = models.FloatField()
    fecha = models.DateTimeField()
    def __str__(self) -> str:
        return "Lote: "+str(self.fk_lote)+" Fecha: "+str(self.fecha)