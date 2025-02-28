from ..models import Datos_metereologicos
from rest_framework.serializers import ModelSerializer




class Datos_metereologicosSerializer(ModelSerializer):
    class Meta:
        model = Datos_metereologicos
        fields = '__all__'