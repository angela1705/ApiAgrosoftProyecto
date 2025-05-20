from django.db import models
from apps.Cultivo.cosechas.models import Cosecha

class AnalisisCostoBeneficio(models.Model):
    cosecha = models.ForeignKey(Cosecha, on_delete=models.CASCADE, related_name='analisis_costo_beneficio')
    fecha_calculo = models.DateTimeField(auto_now_add=True)
    
    mano_obra = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    insumos = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    
    total_costos = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_ingresos = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    
    rentabilidad = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    roi = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    
    class Meta:
        ordering = ['-fecha_calculo']
        verbose_name = "Análisis de Costo-Beneficio"
        verbose_name_plural = "Análisis de Costo-Beneficio"
    
    def __str__(self):
        return f"Análisis Costo-Beneficio - Cosecha {self.cosecha.id} ({self.fecha_calculo.date()})"
