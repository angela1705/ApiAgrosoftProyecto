from rest_framework import serializers
from apps.Iot.sensores.models import Sensor, TipoSensor
from apps.Cultivo.bancal.models import Bancal

class TipoSensorSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoSensor
        fields = '__all__'

class SensorSerializer(serializers.ModelSerializer):
    tipo_sensor_id = serializers.PrimaryKeyRelatedField(
        queryset=TipoSensor.objects.all(), source='tipo_sensor', write_only=True
    )
    tipo_sensor_nombre = serializers.CharField(source='tipo_sensor.nombre', read_only=True)
    unidad_medida = serializers.CharField(source='tipo_sensor.unidad_medida', read_only=True)  
    bancal_id = serializers.PrimaryKeyRelatedField(
        queryset=Bancal.objects.all(), source='bancal', required=False, allow_null=True, write_only=True
    )
    bancal_nombre = serializers.CharField(source='bancal.nombre', read_only=True, allow_null=True)

    class Meta:
        model = Sensor
        fields = [
            'id', 'nombre', 'tipo_sensor_id', 'tipo_sensor_nombre', 'unidad_medida',
            'descripcion', 'bancal_id', 'bancal_nombre', 'medida_minima', 'medida_maxima',
            'estado', 'device_code'
        ]