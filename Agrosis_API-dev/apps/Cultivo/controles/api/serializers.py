from rest_framework import serializers
from apps.Cultivo.controles.models import Control

class ControlSerializer(serializers.ModelSerializer):
    class Meta:
        model = Control
        fields = '__all__'
