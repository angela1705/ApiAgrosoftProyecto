from rest_framework import serializers
from ..models import Insumo, UnidadMedida

class UnidadMedidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnidadMedida
        fields = ['id', 'nombre', 'descripcion', 'creada_por_usuario', 'fecha_creacion']

class InsumoSerializer(serializers.ModelSerializer):
    unidad_medida = UnidadMedidaSerializer(read_only=True)
    unidad_medida_id = serializers.PrimaryKeyRelatedField(
        queryset=UnidadMedida.objects.all(), source='unidad_medida', write_only=True, required=False
    )

    class Meta:
        model = Insumo
        fields = [
            'id', 'nombre', 'descripcion', 'cantidad', 'unidad_medida', 'unidad_medida_id',
            'activo', 'tipo_empacado', 'fecha_registro', 'fecha_caducidad', 'precio_insumo'
        ]