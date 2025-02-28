from rest_framework import serializers
from apps.Cultivo.semillero_herramienta.models import SemilleroHerramienta

class SemilleroHerramientaSerializer(serializers.ModelSerializer):
    class Meta:
        model = SemilleroHerramienta
        fields = '__all__' 