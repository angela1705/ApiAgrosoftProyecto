from rest_framework import serializers
from apps.Usuarios.roles_acciones.models import RolAccion

class RolAccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolAccion
        fields = '__all__'
