from rest_framework import serializers
from apps.mapa.models import PuntoMapa

class PuntoMapaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PuntoMapa
        fields = ["id", "nombre", "latitud", "longitud", "creado"]
