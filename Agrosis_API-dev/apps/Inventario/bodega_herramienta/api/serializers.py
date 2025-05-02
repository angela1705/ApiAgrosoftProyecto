from rest_framework import serializers
from apps.Inventario.bodega_herramienta.models import BodegaHerramienta
from apps.Inventario.bodega.models import Bodega
from apps.Inventario.herramientas.models import Herramienta
from apps.Usuarios.usuarios.models import Usuarios
from apps.Cultivo.actividades.models import PrestamoHerramienta

class BodegaHerramientaSerializer(serializers.ModelSerializer):
    bodega = serializers.PrimaryKeyRelatedField(queryset=Bodega.objects.all())
    herramienta = serializers.PrimaryKeyRelatedField(queryset=Herramienta.objects.all())
    creador = serializers.PrimaryKeyRelatedField(queryset=Usuarios.objects.all(), allow_null=True)

    class Meta:
        model = BodegaHerramienta
        fields = ['id', 'bodega', 'herramienta', 'cantidad', 'creador', 'costo_total', 'cantidad_prestada']

class PrestamoHerramientaSerializer(serializers.ModelSerializer):
    herramienta = serializers.PrimaryKeyRelatedField(queryset=Herramienta.objects.all())
    bodega_herramienta = serializers.PrimaryKeyRelatedField(
        queryset=BodegaHerramienta.objects.all(),
        required=False,
        allow_null=True
    )

    class Meta:
        model = PrestamoHerramienta
        fields = ['id', 'herramienta', 'bodega_herramienta', 'entregada', 'devuelta', 'fecha_devolucion']