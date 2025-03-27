from rest_framework import serializers
from apps.Usuarios.usuarios.models import Usuarios
from apps.Usuarios.roles.models import Roles
from django.core.exceptions import ObjectDoesNotExist

from apps.Usuarios.roles.api.serializer import RolSerializer

class UsuariosSerializer(serializers.ModelSerializer):
    rol = RolSerializer(read_only=True) 
    rol_id = serializers.PrimaryKeyRelatedField(
        queryset=Roles.objects.all(), source="rol", write_only=True, allow_null=True
    ) 

    class Meta:
        model = Usuarios
        fields = ['id', 'nombre', 'apellido', 'email', 'username', 'rol', 'rol_id']
class RegistroUsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = Usuarios
        fields = ['id', 'nombre', 'apellido', 'email', 'username', 'rol', 'password']

    def create(self, validated_data):
        
        if 'password' not in validated_data:
            raise serializers.ValidationError({"password": "Este campo es obligatorio."})
        
        password = validated_data.pop('password')
        usuario = Usuarios(**validated_data)
        
        usuario.set_password(password)  # Encripta la contraseña
        
        
        usuario.save()
        return usuario
