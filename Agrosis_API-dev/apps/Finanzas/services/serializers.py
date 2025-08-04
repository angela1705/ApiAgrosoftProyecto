from rest_framework import serializers
from apps.Cultivo.cosechas.models import Cosecha
class CosechaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cosecha
        fields = ['id', 'cantidad', 'fecha', 'unidades_de_medida']

class AnalisisCostoBeneficioSerializer(serializers.Serializer):
    cosecha = CosechaSerializer()
    costos = serializers.DictField(child=serializers.DecimalField(max_digits=12, decimal_places=2))
    ingresos = serializers.DictField(child=serializers.DecimalField(max_digits=12, decimal_places=2))
    metricas = serializers.DictField(child=serializers.DecimalField(max_digits=12, decimal_places=2))