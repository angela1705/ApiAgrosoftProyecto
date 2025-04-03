from django.db import models
import datetime

class Salario(models.Model):
    fecha_de_implementacion = models.DateField() 
    fecha_de_vencimiento = models.DateField()
    salario_minimo = models.DecimalField(max_digits=10, decimal_places=2)
    auxilio_transporte = models.DecimalField(max_digits=10, decimal_places=2)
    horas_laborales_mes = models.IntegerField()
    valor_hora_ordinaria = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Salario Mínimo: {self.salario_minimo} - Vigencia: {self.fecha_de_implementacion} a {self.fecha_de_vencimiento}"




# Create your models here.
