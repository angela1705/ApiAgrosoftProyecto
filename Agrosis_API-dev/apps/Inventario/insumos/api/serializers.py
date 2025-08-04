from rest_framework import serializers
from ..models import Insumo, UnidadMedida, TipoInsumo
from django.utils import timezone


class UnidadMedidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnidadMedida
        fields = ['id', 'nombre', 'descripcion', 'fecha_creacion', 'creada_por_usuario']


class TipoInsumoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoInsumo
        fields = ['id', 'nombre', 'descripcion', 'fecha_creacion', 'creada_por_usuario']


class InsumoSerializer(serializers.ModelSerializer):
    unidad_medida = UnidadMedidaSerializer(read_only=True)
    tipo_insumo = TipoInsumoSerializer(read_only=True)
    unidad_medida_id = serializers.PrimaryKeyRelatedField(
        queryset=UnidadMedida.objects.all(),
        write_only=True,
        allow_null=True
    )
    tipo_insumo_id = serializers.PrimaryKeyRelatedField(
        queryset=TipoInsumo.objects.all(),
        write_only=True,
        allow_null=True
    )

    class Meta:
        model = Insumo
        fields = [
            'id', 'nombre', 'descripcion', 'cantidad', 'unidad_medida', 'unidad_medida_id',
            'tipo_insumo', 'tipo_insumo_id', 'activo', 'tipo_empacado', 'fecha_registro',
            'fecha_caducidad', 'precio_insumo'
        ]

    def validate_nombre(self, value):
        if not value.strip():
            raise serializers.ValidationError("El nombre es requerido.")
        return value

    def validate_descripcion(self, value):
        if not value.strip():
            raise serializers.ValidationError("La descripción es requerida.")
        return value

    def validate_cantidad(self, value):
        if value < 0:
            raise serializers.ValidationError("La cantidad no puede ser negativa.")
        return value

    def validate(self, data):
        return data

    def create(self, validated_data):
        unidad_medida = validated_data.pop('unidad_medida_id', None)
        tipo_insumo = validated_data.pop('tipo_insumo_id', None)
        validated_data['fecha_registro'] = timezone.now()

        insumo = Insumo.objects.create(
            unidad_medida=unidad_medida,
            tipo_insumo=tipo_insumo,
            **validated_data
        )
        return insumo

    def update(self, instance, validated_data):
        unidad_medida = validated_data.pop('unidad_medida_id', None)
        tipo_insumo = validated_data.pop('tipo_insumo_id', None)

        if unidad_medida is not None:
            instance.unidad_medida = unidad_medida
        if tipo_insumo is not None:
            instance.tipo_insumo = tipo_insumo

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance