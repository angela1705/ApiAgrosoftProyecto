from rest_framework import serializers
from apps.Finanzas.pagos.models import Pago

class PagoSerializer(serializers.ModelSerializer):
    total_a_pagar = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    class Meta:
        model = Pago
        fields = '__all__'