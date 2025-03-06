from rest_framework import serializers
from apps.Usuarios.usuarios.models import Usuarios

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['id', 'nombre', 'apellido', 'email', 'username', 'rol']

class RegistroUsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = Usuarios
        fields = ['id', 'nombre', 'apellido', 'email', 'username', 'rol', 'password']

    def create(self, validated_data):
        password = validated_data.pop('password')
        usuario = Usuarios(**validated_data)
        usuario.set_password(password)
        usuario.save()
        return usuario