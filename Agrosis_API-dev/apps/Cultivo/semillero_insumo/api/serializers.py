from rest_framework import serializers
from apps.Cultivo.semillero_insumo.models import SemilleroInsumo

class SemilleroInsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SemilleroInsumo
        fields = '__all__' 
