from rest_framework import serializers
from apps.Finanzas.pagos.models import Pago

class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = [
            'id',
            'usuario',
            'periodo_inicio',
            'periodo_fin',
            'horas_trabajadas',
            'horas_extras',
            'salario',
            'auxilio_transporte',
            'total_a_pagar'
        ]
        read_only_fields = [
            'horas_trabajadas',
            'horas_extras',
            'salario',
            'auxilio_transporte',
            'total_a_pagar']