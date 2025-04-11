from django.db import models
from datetime import date
from apps.Cultivo.actividades.models import Actividad
class Pago(models.Model):
    horas_trabajadas = models.IntegerField()
    salario = models.ForeignKey('salario.Salario', on_delete=models.CASCADE)
    total_a_pagar = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    usuario = models.ForeignKey('usuarios.Usuarios', on_delete=models.CASCADE)
    periodo_inicio = models.DateField(default=date.today)
    periodo_fin = models.DateField(default=date.today)
    horas_extras = models.IntegerField(default=0)
    auxilio_transporte = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    def calcular_horas_trabajadas(self):
        actividades = Actividad.objects.filter(
            usuario=self.usuario,
            fecha_inicio_date_gte=self.periodo_inicio,
            fecha_fin_date_lte=self.periodo_fin,
            estado='COMPLETADA'
        )
        
        total_minutos = 0
        for actividad in actividades:
            duracion = actividad.fecha_fin - actividad.fecha_inicio
            total_minutos += duracion.total_seconds() / 60
        
        horas_totales = total_minutos / 60
        self.horas_trabajadas = min(horas_totales, self.salario.horas_laborales_mes)
        self.horas_extras = max(0, horas_totales - self.salario.horas_laborales_mes)

    def calcular_total(self):
        self.calcular_horas_trabajadas()

        salario_base = self.horas_trabajadas * float(self.salario.valor_hora_ordinaria)
        horas_extras_valor = self.horas_extras * (float(self.salario.valor_hora_ordinaria) * 1.5)

        dias_trabajados = (self.periodo_fin - self.periodo_inicio).days + 1

        if self.salario.auxilio_transporte:
            auxilio_mensual = float(self.salario.auxilio_transporte)
            auxilio_diario = auxilio_mensual / 30
            self.auxilio_transporte = auxilio_diario * dias_trabajados
        else:
            self.auxilio_transporte = 0

        self.total_a_pagar = salario_base + horas_extras_valor + self.auxilio_transporte
        self.save()

 