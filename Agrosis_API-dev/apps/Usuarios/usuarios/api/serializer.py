from rest_framework import serializers
from apps.Usuarios.usuarios.models import Usuarios
from apps.Usuarios.roles.models import Roles
from django.core.exceptions import ObjectDoesNotExist

from apps.Usuarios.roles.api.serializer import RolSerializer

class UsuariosSerializer(serializers.ModelSerializer):
    rol = RolSerializer(read_only=True) 
    rol_id = serializers.PrimaryKeyRelatedField(
        queryset=Roles.objects.all(), source="rol", write_only=True, required=False, allow_null=True
    ) 

    class Meta:
        model = Usuarios
        fields = ['id', 'nombre', 'apellido', 'email', 'username', 'rol', 'rol_id','password']
class RegistroUsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = Usuarios
        fields = ['id', 'nombre', 'apellido', 'email', 'username',  'password']

    def create(self, validated_data):
        # Asignar un rol por defecto si no se proporciona
        if 'rol' not in validated_data or validated_data['rol'] is None:
            try:
                default_role = Roles.objects.get(nombre='aprendiz')
                validated_data['rol'] = default_role
            except ObjectDoesNotExist:
                raise serializers.ValidationError("El rol por defecto 'aprendiz' no existe en la base de datos.")
        
        # Crear el usuario
        password = validated_data.pop('password')
        usuario = Usuarios(**validated_data)
        usuario.set_password(password)
        usuario.save()
        return usuario