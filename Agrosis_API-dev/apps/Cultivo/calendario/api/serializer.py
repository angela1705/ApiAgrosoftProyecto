from rest_framework import serializers
from apps.Cultivo.calendario.models import Calendario

class CalendarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Calendario
        fields = ['id', 'titulo', 'inicio', 'todo_el_dia', 'color_fondo', 'descripcion']

    def create(self, validated_data):
        validated_data['usuario'] = self.context['request'].user
        return super().create(validated_data)