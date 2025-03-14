from rest_framework import serializers
from ..models import BodegaHerramienta, Bodega, Herramienta

class BodegaHerramientaSerializer(serializers.ModelSerializer):
    bodega = serializers.StringRelatedField() 
    herramienta = serializers.StringRelatedField()  

    class Meta:
        model = BodegaHerramienta
        fields = '__all__'