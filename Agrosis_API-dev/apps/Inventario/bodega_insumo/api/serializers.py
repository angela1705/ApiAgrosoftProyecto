from rest_framework import serializers
from apps.Inventario.bodega_insumo.models import BodegaInsumo
from apps.Inventario.bodega.models import Bodega
from apps.Inventario.insumos.models import Insumo

class BodegaInsumoSerializer(serializers.ModelSerializer):
    bodega = serializers.PrimaryKeyRelatedField(queryset=Bodega.objects.all())
    insumo = serializers.PrimaryKeyRelatedField(queryset=Insumo.objects.all())

    def validate(self, data):
        """
        Valida que la cantidad ingresada no exceda la cantidad disponible del insumo.
        """
        insumo = data.get('insumo')
        cantidad = data.get('cantidad')
        instance = self.instance  

        
        cantidad_disponible = insumo.cantidad

        
        if instance:
            cantidad_disponible += instance.cantidad

        
        if cantidad > cantidad_disponible:
            raise serializers.ValidationError({
                'cantidad': f'La cantidad ingresada ({cantidad}) excede la cantidad disponible ({cantidad_disponible}) para el insumo {insumo.nombre}.'
            })

        return data

    class Meta:
        model = BodegaInsumo
        fields = ['id', 'bodega', 'insumo', 'cantidad']