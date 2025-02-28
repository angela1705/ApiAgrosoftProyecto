from django.db import models

class Pago(models.Model):
    horas_trabajadas = models.IntegerField()
    salario = models.ForeignKey('salario.Salario', on_delete=models.CASCADE)
    total_a_pagar = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    usuario = models.ForeignKey('usuarios.Usuarios', on_delete=models.CASCADE)

    def calcular_total(self):
        self.total_a_pagar = self.horas_trabajadas * self.salario.valor_por_hora

    def __str__(self):
        return f"Pago por {self.horas_trabajadas} horas"
