from rest_framework import serializers
from apps.Usuarios.usuario_rol.models import UsuarioRol

class UsuarioRolSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioRol
        fields = '__all__'
