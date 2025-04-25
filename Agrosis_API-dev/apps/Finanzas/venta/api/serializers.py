from rest_framework import serializers
from apps.Finanzas.venta.models import Venta
from apps.Inventario.insumos.models import UnidadMedida

class VentaSerializer(serializers.ModelSerializer):
    unidad_medida = serializers.CharField(source='producto.unidad_medida.nombre', read_only=True)

    class Meta:
        model = Venta
        fields = ['id', 'producto', 'cantidad', 'total', 'fecha', 'unidad_medida']

    def validate_cantidad(self, value):
        producto = self.initial_data.get('producto')
        if producto:
            from apps.Inventario.precio_producto.models import PrecioProducto
            try:
                precio_producto = PrecioProducto.objects.get(id=producto)
                unidad_medida = precio_producto.unidad_medida
                if unidad_medida and unidad_medida.nombre.lower() in ['unidades', 'unidad', 'pieza', 'piezas']:
                    if not float(value).is_integer():
                        raise serializers.ValidationError("La cantidad debe ser un número entero para esta unidad de medida.")
            except PrecioProducto.DoesNotExist:
                raise serializers.ValidationError("Producto no encontrado.")
        if value <= 0:
            raise serializers.ValidationError("La cantidad debe ser mayor a cero.")
        return value

    def validate(self, data):
        producto = data.get('producto')
        cantidad = data.get('cantidad')
        if producto and cantidad:
            if cantidad > producto.stock:
                raise serializers.ValidationError(f"Stock insuficiente. Disponible: {producto.stock}")
        return data