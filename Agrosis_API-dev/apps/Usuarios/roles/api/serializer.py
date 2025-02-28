from rest_framework import serializers
from ..models import Roles

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = '__all__'
        read_only_fields = ('fecha_creacion', 'fecha_actualizacion')