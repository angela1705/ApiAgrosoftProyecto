from rest_framework.serializers import ModelSerializer
from ..models import Datos_metereologicos

class Datos_metereologicosSerializer(ModelSerializer):
    class Meta:
        model = Datos_metereologicos
        fields = ['id', 'fk_sensor', 'fk_bancal', 'temperature', 'humidity', 'fecha_medicion']