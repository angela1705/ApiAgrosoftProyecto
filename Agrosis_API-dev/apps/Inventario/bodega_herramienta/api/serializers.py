from rest_framework import serializers
from ..models import BodegaHerramienta

class BodegaHerramientaSerializer(serializers.ModelSerializer):
    class Meta:
        model = BodegaHerramienta
        fields = '__all__'
