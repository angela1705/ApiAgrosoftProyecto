from rest_framework import serializers
from apps.Cultivo.cosechas.models import Cosecha

class CosechaSerializer(serializers.ModelSerializer):
    cultivo_nombre = serializers.CharField(source='id_cultivo.nombre', read_only=True)
    class Meta:
        model = Cosecha
        fields = '__all__'
