from rest_framework import serializers
from ..models import Venta
from apps.Inventario.precio_producto.models import PrecioProducto

class VentaSerializer(serializers.ModelSerializer):
    producto = serializers.PrimaryKeyRelatedField(
        queryset=PrecioProducto.objects.all(),
        allow_null=False
    )

    class Meta:
        model = Venta
        fields = ['id', 'producto', 'cantidad', 'total', 'fecha']
        read_only_fields = ['total']

    def validate(self, data):
        producto = data.get('producto')
        cantidad = data.get('cantidad')
        
        if cantidad <= 0:
            raise serializers.ValidationError("La cantidad debe ser mayor a cero.")
        if producto and cantidad > producto.stock:
            raise serializers.ValidationError(
                f"Stock insuficiente. Disponible: {producto.stock}"
            )
        
        return data