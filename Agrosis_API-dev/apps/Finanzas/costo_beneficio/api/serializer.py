from rest_framework import serializers
from apps.Finanzas.costo_beneficio.models import AnalisisCostoBeneficio
from apps.Cultivo.cosechas.models import Cosecha

class CosechaSerializer(serializers.ModelSerializer):
    cultivo_nombre = serializers.CharField(source='id_cultivo.nombre', read_only=True)

    class Meta:
        model = Cosecha
        fields = ['id', 'fecha', 'cultivo_nombre', 'unidades_de_medida']  # Ya no pongas 'nombre'


class AnalisisCostoBeneficioSerializer(serializers.ModelSerializer):
    cosecha = CosechaSerializer(read_only=True)

    class Meta:
        model = AnalisisCostoBeneficio
        fields = [
            'id',
            'cosecha',
            'mano_obra',
            'insumos',
            'total_costos',
            'total_ingresos',
            'rentabilidad',
            'roi',
            'fecha_calculo'
        ]
        read_only_fields = ['fecha_calculo']
