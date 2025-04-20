from django.db import models
from datetime import date
from apps.Cultivo.actividades.models import Actividad

class Pago(models.Model):
    salario = models.ForeignKey('salario.Salario', on_delete=models.CASCADE)
    tiempo_trabajado = models.ForeignKey('actividades.Actividad', on_delete=models.CASCADE)  
    total_a_pagar = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    periodo_inicio = models.DateField(default=date.today)
    periodo_fin = models.DateField(default=date.today)

    def calcular_horas_trabajadas(self):
      
        usuario = self.tiempo_trabajado.usuario
        
      
        actividades = Actividad.objects.filter(
            usuario=usuario,  
            fecha_inicio__gte=self.periodo_inicio, 
            fecha_fin__lte=self.periodo_fin,       
            estado='COMPLETADA'
        )
        
        total_minutos = 0
        for actividad in actividades:
            duracion = actividad.fecha_fin - actividad.fecha_inicio
            total_minutos += duracion.total_seconds() / 60  
        
        horas_totales = total_minutos / 60  
        jornales_trabajados = horas_totales / 8.5  
        return jornales_trabajados

    def calcular_total(self):
        jornales = self.calcular_horas_trabajadas()
        valor_jornal = float(self.salario.valorJornal)  
        self.total_a_pagar = jornales * valor_jornal
        self.save() 