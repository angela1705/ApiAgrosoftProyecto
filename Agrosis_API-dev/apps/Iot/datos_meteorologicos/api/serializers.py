from rest_framework import serializers
from apps.Iot.datos_meteorologicos.models import Datos_metereologicos, Evapotranspiracion

class Datos_metereologicosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Datos_metereologicos
        fields = [
            'id', 'fk_sensor', 'fk_bancal', 'temperatura', 'humedad_ambiente',
            'luminosidad', 'lluvia', 'velocidad_viento', 'direccion_viento',
            'humedad_suelo', 'ph_suelo', 'fecha_medicion'
        ]

class EvapotranspiracionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evapotranspiracion
        fields = ['id', 'fk_bancal', 'fecha', 'value']