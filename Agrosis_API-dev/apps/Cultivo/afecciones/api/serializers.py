from rest_framework import serializers
from apps.Cultivo.afecciones.models import Afeccion

class AfeccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Afeccion
        fields = '__all__'
