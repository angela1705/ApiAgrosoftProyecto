from rest_framework import serializers
from apps.Usuarios.usuarios.models import Usuarios

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['id', 'nombre', 'apellido', 'email', 'username', 'rol']
