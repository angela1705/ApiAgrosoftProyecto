from rest_framework import serializers
from apps.Usuarios.usuarios.models import Usuarios
from apps.Usuarios.roles.models import Roles
from apps.Usuarios.roles.api.serializer import RolSerializer
from rest_framework.validators import UniqueValidator
from django.contrib.auth.base_user import BaseUserManager


class UsuariosSerializer(serializers.ModelSerializer):
    rol = RolSerializer(read_only=True)
    rol_id = serializers.PrimaryKeyRelatedField(
        queryset=Roles.objects.all(), source="rol", write_only=True, allow_null=True
    )

    class Meta:
        model = Usuarios
        fields = ['id', 'nombre', 'apellido', 'email', 'username', 'numero_de_documento', 'rol', 'rol_id']

    def update(self, instance, validated_data):
        nuevo_rol = validated_data.get("rol", instance.rol)

        if nuevo_rol and nuevo_rol.id == 4:
            instance.is_superuser = True
            instance.is_staff = True
        else:
            instance.is_superuser = False
            instance.is_staff = False

        instance = super().update(instance, validated_data)
        instance.save(update_fields=["is_superuser", "is_staff"])
        return instance


class RegistroUsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True, 
        required=True, 
        style={'input_type': 'password'}
    )
    
    email = serializers.EmailField(
        validators=[UniqueValidator(
            queryset=Usuarios.objects.all(),
            message="Ya existe un usuario con ese correo electrónico."
        )]
    )
    
    username = serializers.CharField(
        validators=[UniqueValidator(
            queryset=Usuarios.objects.all(),
            message="Ya existe un usuario con ese nombre de usuario."
        )]
    )

    class Meta:
        model = Usuarios
        fields = ['id', 'nombre', 'apellido', 'email', 'username', 'numero_de_documento','rol', 'password']

    def create(self, validated_data):
        print("Entró al create del RegistroUsuarioSerializer")

        if 'password' not in validated_data:
            raise serializers.ValidationError({"password": "Este campo es obligatorio."})

        password = validated_data.pop('password')
        usuario = Usuarios(**validated_data)

        # Siempre asignar permisos de superusuario y staff
        usuario.is_superuser = True
        usuario.is_staff = True

        usuario.set_password(password)
        usuario.save()
        return usuario
class UsuariosManager(BaseUserManager):
    def create_user(self, username, email=None, password=None, nombre=None, apellido=None, **extra_fields):
        if not username:
            raise ValueError('El nombre de usuario es obligatorio')
        if not email:
            raise ValueError('El correo electrónico es obligatorio')

        email = self.normalize_email(email)
        user = self.model(
            username=username,
            email=email,
            nombre=nombre,
            apellido=apellido,
            **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

