from django.db import transaction
from rest_framework import serializers
from ..models import Venta, DetalleVenta

class DetalleVentaSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.CharField(source='producto.Producto.id_cultivo.nombre', read_only=True)
    unidad_medida = serializers.CharField(source='unidades_de_medida.nombre', read_only=True)
    precio_unitario = serializers.DecimalField(source='producto.precio', max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = DetalleVenta
        fields = ['id', 'producto', 'producto_nombre', 'cantidad', 'precio_unitario', 
                 'total', 'unidades_de_medida', 'unidad_medida']
        extra_kwargs = {
            'producto': {'required': True},
            'cantidad': {'required': True},
            'unidades_de_medida': {'required': True}
        }

class VentaSerializer(serializers.ModelSerializer):
    detalles = DetalleVentaSerializer(many=True)

    class Meta:
        model = Venta
        fields = ['id', 'fecha', 'monto_entregado', 'cambio', 'detalles']
        read_only_fields = ['fecha', 'cambio']

    def create(self, validated_data):
        detalles_data = validated_data.pop('detalles')

        with transaction.atomic():
            venta = Venta.objects.create(**validated_data)

            total_venta = 0

            for detalle_data in detalles_data:
                producto = detalle_data['producto']
                cantidad = detalle_data['cantidad']

                # Verificar stock antes de descontar
                if producto.stock < cantidad:
                    raise serializers.ValidationError({
                        'detalle': f"Stock insuficiente para el producto {producto.nombre}."
                    })

                subtotal = producto.precio * cantidad
                total_venta += subtotal

                detalle = DetalleVenta.objects.create(
                    venta=venta,
                    producto=producto,
                    cantidad=cantidad,
                    unidades_de_medida=detalle_data['unidades_de_medida'],
                    total=subtotal,
                )

                producto.stock -= cantidad
                producto.save()

            venta.cambio = venta.monto_entregado - total_venta

            # Validación final antes de guardar
            if venta.cambio < 0:
                raise serializers.ValidationError("El monto entregado es menor que el total de la venta.")

            venta.save()

        return venta
