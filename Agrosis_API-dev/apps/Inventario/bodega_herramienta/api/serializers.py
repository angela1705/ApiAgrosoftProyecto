from rest_framework import serializers
from ..models import BodegaHerramienta, Bodega, Herramienta
from apps.Usuarios.usuarios.models import Usuarios

class BodegaHerramientaSerializer(serializers.ModelSerializer):
    bodega = serializers.PrimaryKeyRelatedField(queryset=Bodega.objects.all())
    herramienta = serializers.PrimaryKeyRelatedField(queryset=Herramienta.objects.all())
    creador = serializers.PrimaryKeyRelatedField(queryset=Usuarios.objects.all(), allow_null=True)

    class Meta:
        model = BodegaHerramienta
        fields = ['id', 'bodega', 'herramienta', 'cantidad', 'creador', 'costo_total', 'cantidad_prestada']