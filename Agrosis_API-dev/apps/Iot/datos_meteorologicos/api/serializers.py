from rest_framework import serializers
from apps.Iot.datos_meteorologicos.models import Datos_metereologicos
from apps.Iot.sensores.models import Sensor

class Datos_metereologicosSerializer(serializers.ModelSerializer):
    sensor_nombre = serializers.CharField(source='fk_sensor.nombre', read_only=True, default='N/A')
    bancal_nombre = serializers.CharField(source='fk_sensor.bancal.nombre', read_only=True, allow_null=True, default='N/A')
    device_code = serializers.CharField(write_only=True)

    class Meta:
        model = Datos_metereologicos
        fields = [
            'id', 'device_code', 'sensor_nombre', 'bancal_nombre', 'temperatura',
            'humedad_ambiente', 'luminosidad', 'lluvia', 'velocidad_viento',
            'direccion_viento', 'humedad_suelo', 'ph_suelo', 'calidad_aire',
            'fecha_medicion'
        ]
        read_only_fields = ['id', 'sensor_nombre', 'bancal_nombre']

    def validate_device_code(self, value):
        try:
            sensor = Sensor.objects.get(device_code=value)
        except Sensor.DoesNotExist:
            raise serializers.ValidationError(f"No existe un sensor con device_code = '{value}'.")
        if sensor.estado != 'activo':
            raise serializers.ValidationError(f"El sensor '{sensor.nombre}' está inactivo.")
        return value

    def create(self, validated_data):
        device_code = validated_data.pop('device_code')
        sensor = Sensor.objects.get(device_code=device_code)
        validated_data['fk_sensor'] = sensor
        validated_data['fk_bancal'] = sensor.bancal if sensor.bancal else None
        return Datos_metereologicos.objects.create(**validated_data)