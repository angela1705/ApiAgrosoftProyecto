from django.db import models
class Salario(models.Model):
    salario_base = models.DecimalField(max_digits=10, decimal_places=2)
    valor_por_hora = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Salario de {self.salario_base}"


# Create your models here.
