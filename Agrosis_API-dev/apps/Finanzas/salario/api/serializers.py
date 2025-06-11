from rest_framework import serializers
from apps.Usuarios.roles.api.serializer import RolSerializer
from apps.Usuarios.roles.models import Roles
from apps.Finanzas.salario.models import Salario

class SalarioSerializer(serializers.ModelSerializer):
    rol = RolSerializer(read_only=True)
    rol_id = serializers.PrimaryKeyRelatedField(
        queryset=Roles.objects.all(), 
        source='rol',
        write_only=True
    )
    rol_nombre = serializers.CharField(source='rol.nombre', read_only=True)  

    class Meta:
        model = Salario
        fields = ['id', 'rol', 'rol_id', 'rol_nombre', 'fecha_de_implementacion', 'valorJornal', 'activo']
        read_only_fields = ['id', 'rol_nombre']

    def validate(self, data):
        if Salario.objects.filter(
            rol=data['rol'],
            fecha_de_implementacion=data['fecha_de_implementacion']
        ).exists():
            raise serializers.ValidationError("Ya existe un salario para este rol en esta fecha.")
        return data
