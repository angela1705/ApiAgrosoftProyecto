from rest_framework import serializers
from apps.Cultivo.plagas.models import Plaga

class PlagaSerializer(serializers.ModelSerializer):
    tipo_plaga = serializers.CharField(source='fk_tipo_plaga.nombre', default='Sin tipo', read_only=True)

    class Meta:
        model = Plaga
        fields = ['id', 'fk_tipo_plaga', 'nombre', 'descripcion', 'img', 'tipo_plaga']
