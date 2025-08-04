from rest_framework import serializers
from apps.Usuarios.usuarios.models import Usuarios
from apps.Usuarios.roles.models import Roles
from apps.Usuarios.roles.api.serializer import RolSerializer
from rest_framework.validators import UniqueValidator
from django.contrib.auth.base_user import BaseUserManager
import random
from django.utils.text import slugify

class UsuariosSerializer(serializers.ModelSerializer):
    rol = RolSerializer(read_only=True)
    rol_id = serializers.PrimaryKeyRelatedField(
        queryset=Roles.objects.all(), source="rol", write_only=True, allow_null=True
    )

    class Meta:
        model = Usuarios
        fields = ['id', 'nombre', 'apellido', 'email', 'username', 'numero_documento', 'rol', 'rol_id','is_staff']


class RegistroUsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=False,
        allow_null=True,
        style={'input_type': 'password'}
    )
    password_generada = serializers.SerializerMethodField(read_only=True)

    email = serializers.EmailField(
        validators=[UniqueValidator(
            queryset=Usuarios.objects.all(),
            message="Ya existe un usuario con ese correo electrónico."
        )]
    )

    numero_documento = serializers.IntegerField(
        min_value=100000,
        max_value=999999999999999999999,
        validators=[UniqueValidator(
            queryset=Usuarios.objects.all(),
            message="Ya existe un usuario con ese número de documento."
        )],
        error_messages={
            "min_value": "El número de documento debe tener al menos 7 dígitos.",
            "max_value": "El número de documento NO debe exceder 19 dígitos.",
            "required": "El número de documento es obligatorio.",
            "invalid": "Ingrese un número de documento válido."
        }
    )

    class Meta:
        model = Usuarios
        fields = [
            'id', 'nombre', 'apellido', 'email',
            'numero_documento', 'rol', 'password', 'password_generada'
        ]

    def create(self, validated_data):
        print("Entró al create del RegistroUsuarioSerializer")

        nombre = validated_data.get("nombre", "")
        apellido = validated_data.get("apellido", "")
        numero_documento = validated_data.get("numero_documento", "")

        # Generar username único basado en nombre y apellido
        base_username = slugify(f"{nombre}{apellido}")
        username_generado = generar_username_unico(base_username)
        validated_data["username"] = username_generado

        # Extraer la contraseña enviada (si viene)
        password = validated_data.pop("password", None)

        # Crear el usuario
        usuario = Usuarios(**validated_data)
        usuario.is_superuser = True
        usuario.is_staff = True

        if not password:
            primera_letra = nombre[0].lower() if nombre else "x"
            password = f"{primera_letra}{numero_documento}"
            usuario._password_generada = password  

        usuario.set_password(password)
        usuario.save()
        return usuario

    def get_password_generada(self, obj):
        return getattr(obj, "_password_generada", None)


# Auxiliar
def generar_username_unico(base_username):
    contador = 1
    username_final = base_username

    while Usuarios.objects.filter(username=username_final).exists():
        username_final = f"{base_username}{contador}"
        contador += 1
        if contador > 999:
            raise serializers.ValidationError("No se pudo generar un username único.")

    return username_final


class RegistroSecundarioUsuarioSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=False,
        allow_null=True,
        style={'input_type': 'password'}
    )

    password_generada = serializers.SerializerMethodField(read_only=True)


    numero_documento = serializers.IntegerField(
        validators=[UniqueValidator(
            queryset=Usuarios.objects.all(),
            message="Ya existe un usuario con ese número de documento."
        )]
    )

    class Meta:
        model = Usuarios
        fields = ['id', 'nombre', 'apellido',  'numero_documento', 'rol', 'password', 'password_generada']

    def create(self, validated_data):
        nombre = validated_data.get("nombre", "")
        apellido = validated_data.get("apellido", "")
        numero_documento = validated_data.get("numero_documento", "")

        base_username = slugify(f"{nombre}{apellido}")
        username_generado = generar_username_unico(base_username)
        validated_data["username"] = username_generado

        password = validated_data.pop("password", None)

        usuario = Usuarios(**validated_data)
        usuario.is_superuser = True
        usuario.is_staff = True

        if not password:
            primera_letra = nombre[0].lower() if nombre else "x"
            password = f"{primera_letra}{numero_documento}"

        usuario.set_password(password)
        usuario._password_generada = password  

        usuario.save()
        return usuario

    def get_password_generada(self, obj):
        return getattr(obj, "_password_generada", None)

