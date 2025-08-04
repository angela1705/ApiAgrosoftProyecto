from rest_framework import serializers
from apps.Inventario.bodega_precio_producto.models import BodegaPrecioProducto
from apps.Inventario.bodega.models import Bodega
from apps.Inventario.precio_producto.models import PrecioProducto
from apps.Usuarios.usuarios.models import Usuarios

class BodegaPrecioProductoSerializer(serializers.ModelSerializer):
    bodega = serializers.PrimaryKeyRelatedField(queryset=Bodega.objects.all())
    producto = serializers.PrimaryKeyRelatedField(queryset=PrecioProducto.objects.all())
    creador = serializers.PrimaryKeyRelatedField(queryset=Usuarios.objects.all(), allow_null=True)

    def validate(self, data):
        precio = data.get('precio')
        bodega = data.get('bodega')
        producto = data.get('producto')
        cantidad = data.get('cantidad')
        instance = self.instance

        
        if precio < 0:
            raise serializers.ValidationError({
                'precio': 'El precio no puede ser negativo.'
            })

        
        if not instance:  
            if BodegaPrecioProducto.objects.filter(bodega=bodega, producto=producto).exists():
                raise serializers.ValidationError({
                    'non_field_errors': f'Ya existe un precio para el producto {producto.nombre} en la bodega {bodega.nombre}.'
                })
        else:  
            if BodegaPrecioProducto.objects.filter(bodega=bodega, producto=producto).exclude(id=instance.id).exists():
                raise serializers.ValidationError({
                    'non_field_errors': f'Ya existe un precio para el producto {producto.nombre} en la bodega {bodega.nombre}.'
                })

        
        try:
            cantidad_disponible = producto.cantidad  
        except AttributeError:
            raise serializers.ValidationError({
                'producto': 'El producto no tiene una cantidad disponible definida.'
            })

        
        if instance:
            cantidad_disponible += instance.cantidad

        if cantidad > cantidad_disponible:
            raise serializers.ValidationError({
                'cantidad': f'La cantidad ingresada ({cantidad}) excede la cantidad disponible ({cantidad_disponible}) para el producto {producto.nombre}.'
            })

        return data

    class Meta:
        model = BodegaPrecioProducto
        fields = ['id', 'bodega', 'producto', 'precio', 'cantidad', 'creador']