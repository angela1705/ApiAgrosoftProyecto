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
        venta = Venta.objects.create(**validated_data)
        
        for detalle_data in detalles_data:
            producto = detalle_data['producto']
            cantidad = detalle_data['cantidad']
            
            detalle_data['total'] = producto.precio * cantidad
            
            DetalleVenta.objects.create(venta=venta, **detalle_data)
            
            producto.stock -= cantidad
            producto.save()
        
        venta.cambio = venta.monto_entregado - sum(d.total for d in venta.detalles.all())
        venta.save()
        
        return venta