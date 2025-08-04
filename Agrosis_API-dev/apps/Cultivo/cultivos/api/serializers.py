from rest_framework import serializers
from apps.Cultivo.cultivos.models import Cultivo
from apps.Cultivo.actividades.models import Actividad
from apps.Cultivo.cosechas.models import Cosecha

class CultivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cultivo
        fields = '__all__'
        
class ActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actividad
        fields = ['id', 'nombre', 'fecha', 'tipoActividad']

class CosechaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cosecha
        fields = ['id', 'cantidad', 'fechaCosecha']

class EventoTrazabilidadSerializer(serializers.Serializer):
    tipo = serializers.CharField()
    fecha = serializers.DateField()
    datos = serializers.DictField()