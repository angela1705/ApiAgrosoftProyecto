from rest_framework import serializers
from apps.Finanzas.pagos.models import Pago
from apps.Finanzas.salario.models import Salario  
from apps.Cultivo.actividades.models import Actividad 

class SalarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Salario
        fields = ['valorJornal']  

class ActividadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actividad
        fields = ['usuario', 'fecha_inicio', 'fecha_fin'] 

class PagoSerializer(serializers.ModelSerializer):
    salario = SalarioSerializer()  
    tiempo_trabajado = ActividadSerializer()  
    
    class Meta:
        model = Pago
        fields = [
            'id',
            'tiempo_trabajado',  
            'periodo_inicio',
            'periodo_fin',
            'salario',  
            'total_a_pagar'
        ]
        read_only_fields = [
            'horas_trabajadas',
            'salario', 
            'total_a_pagar'
        ]