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
        fields = ['id', 'nombre', 'apellido', 'email', 'username', 'numero_documento', 'rol', 'rol_id']

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
    

    numero_documento = serializers.IntegerField(
    min_value=1000000,  
    validators=[UniqueValidator(
            queryset=Usuarios.objects.all(),
            message="Ya existe un usuario con ese número de documento."
        )],
    error_messages={
        "min_value": "El número de documento debe tener al menos 7 dígitos.",
        "required": "El número de documento es obligatorio.",
        "invalid": "Ingrese un número de documento válido."
    }
)


    class Meta:
        model = Usuarios
        fields = ['id', 'nombre', 'apellido', 'email', 'numero_documento','rol', 'password']

    def create(self, validated_data):
        print("Entró al create del RegistroUsuarioSerializer")

        if 'password' not in validated_data:
            raise serializers.ValidationError({"password": "Este campo es obligatorio."})

        password = validated_data.pop('password')

        nombre = validated_data.get("nombre", "")
        apellido = validated_data.get("apellido", "")
        base_username = slugify(f"{nombre}{apellido}")
        username_generado = generar_username_unico(base_username)

        usuario = Usuarios(username=username_generado, **validated_data)
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

    email = serializers.EmailField(
        validators=[UniqueValidator(
            queryset=Usuarios.objects.all(),
            message="Ya existe un usuario con ese correo electrónico."
        )]
    )


    numero_documento = serializers.IntegerField(
        validators=[UniqueValidator(
            queryset=Usuarios.objects.all(),
            message="Ya existe un usuario con ese número de documento."
        )]
    )

    class Meta:
        model = Usuarios
        fields = ['id', 'nombre', 'apellido', 'email', 'numero_documento', 'rol', 'password']

    def create(self, validated_data):
        print("Entró al create del RegistroSecundarioUsuarioSerializer")

        nombre = validated_data.get("nombre", "")
        apellido = validated_data.get("apellido", "")
        base_username = slugify(f"{nombre}{apellido}")  

        username_generado = generar_username_unico(base_username)
        validated_data["username"] = username_generado
        password = validated_data.pop('password', None)
        usuario = Usuarios(**validated_data)

        usuario.is_superuser = True
        usuario.is_staff = True

        if password:
            usuario.set_password(password)
        else:
            usuario.set_unusable_password()

        usuario.save()
        return usuario
