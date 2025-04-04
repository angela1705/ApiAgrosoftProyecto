# apps/Finanzas/precio_producto/api/serializers.py
from rest_framework import serializers
from apps.Finanzas.precio_producto.models import PrecioProducto

class PrecioProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrecioProducto
        fields = '__all__'