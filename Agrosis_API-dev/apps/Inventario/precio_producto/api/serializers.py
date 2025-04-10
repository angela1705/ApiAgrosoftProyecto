from rest_framework import serializers
from ..models import PrecioProducto

class PrecioProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrecioProducto
        fields = '__all__'