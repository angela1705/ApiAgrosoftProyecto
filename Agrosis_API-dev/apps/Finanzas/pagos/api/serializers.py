from rest_framework import serializers
from apps.Finanzas.pagos.models import Pago
from apps.Cultivo.actividades.models import Actividad
from apps.Finanzas.salario.models import Salario
from django.core.exceptions import ValidationError
from apps.Usuarios.usuarios.models import Usuarios

class PagoCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        fields = ['usuario', 'fecha_inicio', 'fecha_fin']
        
class PagoSerializer(serializers.ModelSerializer):
    usuario_nombre = serializers.CharField(source='usuario.nombre', read_only=True)
    usuario_rol = serializers.CharField(source='usuario.rol.nombre', read_only=True)

    class Meta:
        model = Pago
        fields = '__all__'
        read_only_fields = ['horas_trabajadas', 'jornales', 'total_pago', 'fecha_calculo', 'salario', 'actividades']

class CalculoPagoSerializer(serializers.Serializer):
    usuario_id = serializers.IntegerField()
    fecha_inicio = serializers.DateField()
    fecha_fin = serializers.DateField()

    def validate(self, data):
        if data['fecha_inicio'] > data['fecha_fin']:
            raise serializers.ValidationError("La fecha de inicio no puede ser mayor que la fecha fin")
        
        usuario = Usuarios.objects.filter(id=data['usuario_id']).first()
        if not usuario:
            raise serializers.ValidationError("Usuario no encontrado")
        
        if not usuario.rol:
            raise serializers.ValidationError("El usuario no tiene un rol asignado")
            
        return data

    def create(self, validated_data):
        usuario = Usuarios.objects.get(id=validated_data['usuario_id'])
        fecha_inicio = validated_data['fecha_inicio']
        fecha_fin = validated_data['fecha_fin']

        actividades = Actividad.objects.filter(
            usuarios=usuario,
            estado='COMPLETADA',
            fecha_fin__date__gte=fecha_inicio,
            fecha_fin__date__lte=fecha_fin
        )

        if not actividades.exists():
            raise ValidationError("No hay actividades completadas en el rango especificado")

        total_segundos = sum(
            (act.fecha_fin - act.fecha_inicio).total_seconds()
            for act in actividades
        )
        horas_trabajadas = total_segundos / 3600

        salario = Salario.objects.filter(
            rol=usuario.rol,
            activo=True,
            fecha_de_implementacion__lte=fecha_fin
        ).order_by('-fecha_de_implementacion').first()

        if not salario:
            raise ValidationError(f"No existe un salario configurado para el rol {usuario.rol.nombre}")

        jornales = horas_trabajadas / 8  # Asumiendo 8.5 horas por jornal
        total_pago = jornales * float(salario.valorJornal)

        # Crear el pago
        pago = Pago.objects.create(
            usuario=usuario,
            fecha_inicio=fecha_inicio,
            fecha_fin=fecha_fin,
            horas_trabajadas=round(horas_trabajadas, 2),
            jornales=round(jornales, 2),
            total_pago=round(total_pago, 2),
            salario=salario
        )
        pago.actividades.set(actividades)
        
        return pago