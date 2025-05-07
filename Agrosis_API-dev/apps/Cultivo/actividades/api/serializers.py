from rest_framework import serializers
from apps.Cultivo.actividades.models import Actividad, PrestamoHerramienta, PrestamoInsumo
from apps.Usuarios.usuarios.models import Usuarios
from apps.Inventario.insumos.models import Insumo
from apps.Inventario.herramientas.models import Herramienta
from apps.Inventario.bodega_herramienta.models import BodegaHerramienta
from django.shortcuts import get_object_or_404
from django.db import transaction
from django.utils import timezone
from .signals import notificar_asignacion_actividad

class UsuarioActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['nombre']

class PrestamoInsumoSerializer(serializers.ModelSerializer):
    insumo_nombre = serializers.CharField(source='insumo.nombre', read_only=True)
    unidad_medida = serializers.CharField(source='insumo.unidad_medida.abreviatura', read_only=True)

    class Meta:
        model = PrestamoInsumo
        fields = '__all__'

class PrestamoHerramientaSerializer(serializers.ModelSerializer):
    herramienta_nombre = serializers.CharField(source='herramienta.nombre', read_only=True)

    class Meta:
        model = PrestamoHerramienta
        fields = '__all__'

class ActividadSerializer(serializers.ModelSerializer):
    prestamos_insumos = PrestamoInsumoSerializer(many=True, read_only=True)
    prestamos_herramientas = PrestamoHerramientaSerializer(many=True, read_only=True)
    tipo_actividad_nombre = serializers.CharField(source='tipo_actividad.nombre', read_only=True)
    usuarios = serializers.ListField(child=serializers.IntegerField(), write_only=True)
    usuarios_data = UsuarioActividadSerializer(source='usuarios', many=True, read_only=True)
    insumos = serializers.ListField(child=serializers.DictField(), write_only=True, required=False)
    herramientas = serializers.ListField(child=serializers.DictField(), write_only=True, required=False)

    class Meta:
        model = Actividad
        fields = '__all__'

    def validate_insumos(self, insumos):
        for insumo_entry in insumos:
            insumo_id = insumo_entry.get('insumo')
            cantidad_usada = insumo_entry.get('cantidad_usada', 0)
            insumo = get_object_or_404(Insumo, id=insumo_id)
            if cantidad_usada > insumo.cantidad:
                raise serializers.ValidationError(
                    f"No hay suficiente stock para {insumo.nombre}. Disponible: {insumo.cantidad}, solicitado: {cantidad_usada}"
                )
        return insumos

    def validate_herramientas(self, herramientas):
        for herramienta_entry in herramientas:
            herramienta_id = herramienta_entry.get('herramienta')
            bodega_herramienta = BodegaHerramienta.objects.filter(herramienta_id=herramienta_id).first()
            if not bodega_herramienta or bodega_herramienta.cantidad < 1:
                raise serializers.ValidationError(
                    f"No hay herramientas disponibles para {bodega_herramienta.herramienta.nombre if bodega_herramienta else 'la herramienta'}"
                )
        return herramientas

    def create(self, validated_data):
        with transaction.atomic():
            usuario_ids = validated_data.pop('usuarios', [])
            insumos_data = validated_data.pop('insumos', [])
            herramientas_data = validated_data.pop('herramientas', [])

            actividad = Actividad.objects.create(**validated_data)
            usuarios = Usuarios.objects.filter(id__in=usuario_ids)
            actividad.usuarios.set(usuarios)

            # Procesar insumos
            for insumo_entry in insumos_data:
                insumo = get_object_or_404(Insumo, id=insumo_entry['insumo'])
                cantidad_usada = insumo_entry.get('cantidad_usada', 0)
                insumo.cantidad -= cantidad_usada
                insumo.save()
                PrestamoInsumo.objects.create(
                    actividad=actividad,
                    insumo=insumo,
                    cantidad_usada=cantidad_usada
                )

            # Procesar herramientas
            for herramienta_entry in herramientas_data:
                herramienta = get_object_or_404(Herramienta, id=herramienta_entry['herramienta'])
                bodega_herramienta = BodegaHerramienta.objects.filter(herramienta=herramienta).first()
                if bodega_herramienta:
                    bodega_herramienta.cantidad -= 1
                    bodega_herramienta.cantidad_prestada += 1
                    bodega_herramienta.save()
                PrestamoHerramienta.objects.create(
                    actividad=actividad,
                    herramienta=herramienta,
                    entregada=herramienta_entry.get('entregada', True),
                    devuelta=herramienta_entry.get('devuelta', False),
                    fecha_devolucion=herramienta_entry.get('fecha_devolucion', None)
                )

            notificar_asignacion_actividad(actividad, usuario_ids)
            return actividad

    def update(self, instance, validated_data):
        with transaction.atomic():
            usuario_ids = validated_data.pop('usuarios', None)
            insumos_data = validated_data.pop('insumos', None)
            herramientas_data = validated_data.pop('herramientas', None)

            # Actualizar campos de la actividad
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
            instance.save()

            # Actualizar usuarios
            if usuario_ids is not None:
                usuarios = Usuarios.objects.filter(id__in=usuario_ids)
                instance.usuarios.set(usuarios)
                notificar_asignacion_actividad(instance, usuario_ids)

            # Actualizar insumos
            if insumos_data is not None:
                instance.prestamos_insumos.all().delete()
                for insumo_entry in insumos_data:
                    insumo = get_object_or_404(Insumo, id=insumo_entry['insumo'])
                    cantidad_usada = insumo_entry.get('cantidad_usada', 0)
                    insumo.cantidad -= cantidad_usada
                    insumo.save()
                    PrestamoInsumo.objects.create(
                        actividad=instance,
                        insumo=insumo,
                        cantidad_usada=cantidad_usada
                    )

            # Actualizar herramientas
            if herramientas_data is not None:
                instance.prestamos_herramientas.all().delete()
                for herramienta_entry in herramientas_data:
                    herramienta = get_object_or_404(Herramienta, id=herramienta_entry['herramienta'])
                    bodega_herramienta = BodegaHerramienta.objects.filter(herramienta=herramienta).first()
                    if bodega_herramienta:
                        bodega_herramienta.cantidad -= 1
                        bodega_herramienta.cantidad_prestada += 1
                        bodega_herramienta.save()
                    PrestamoHerramienta.objects.create(
                        actividad=instance,
                        herramienta=herramienta,
                        entregada=herramienta_entry.get('entregada', True),
                        devuelta=herramienta_entry.get('devuelta', False),
                        fecha_devolucion=herramienta_entry.get('fecha_devolucion', None)
                    )

            return instance

class FinalizarActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actividad
        fields = ['fecha_fin']

    def validate(self, data):
        data['estado'] = 'COMPLETADA'
        if not data.get('fecha_fin'):
            raise serializers.ValidationError("La fecha de finalización es requerida")
        return data

    def update(self, instance, validated_data):
        with transaction.atomic():
            instance.fecha_fin = validated_data.get('fecha_fin')
            instance.estado = 'COMPLETADA'
            instance.save()

            # Devolver herramientas automáticamente
            prestamos_herramientas = instance.prestamos_herramientas.filter(devuelta=False)
            for prestamo in prestamos_herramientas:
                bodega_herramienta = BodegaHerramienta.objects.filter(herramienta=prestamo.herramienta).first()
                if bodega_herramienta:
                    bodega_herramienta.cantidad += 1
                    bodega_herramienta.cantidad_prestada -= 1
                    bodega_herramienta.save()
                prestamo.devuelta = True
                prestamo.fecha_devolucion = timezone.now()
                prestamo.save()

            return instance