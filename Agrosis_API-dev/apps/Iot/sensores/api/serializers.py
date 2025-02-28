from ..models import Sensores
from rest_framework.serializers import ModelSerializer
class SensoresSerializer(ModelSerializer):
    class Meta:
        model = Sensores
        fields = '__all__'
