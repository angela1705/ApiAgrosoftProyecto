from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status, serializers
from rest_framework.response import Response
from datetime import date
from django.shortcuts import get_object_or_404
from apps.Finanzas.pagos.models import Pago
from apps.Finanzas.pagos.api.serializers import PagoSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead, PermisoPorRol
from apps.Finanzas.salario.models import Salario
from apps.Cultivo.actividades.models import Actividad

class PagoViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrRead, PermisoPorRol]
    serializer_class = PagoSerializer

    def get_queryset(self):
        """Filtrado personalizado basado en el usuario"""
        queryset = Pago.objects.select_related(
            'salario',
            'tiempo_trabajado',
            'tiempo_trabajado__usuario'
        )
        
        
        if not self.request.user.is_staff:
            queryset = queryset.filter(tiempo_trabajado__usuario=self.request.user)
            
       
        periodo_inicio = self.request.query_params.get('periodo_inicio')
        periodo_fin = self.request.query_params.get('periodo_fin')
        
        if periodo_inicio and periodo_fin:
            queryset = queryset.filter(
                periodo_inicio__gte=periodo_inicio,
                periodo_fin__lte=periodo_fin
            )
            
        return queryset

    def perform_create(self, serializer):
        """Lógica para crear un nuevo pago con validaciones"""
        
        salario_vigente = get_object_or_404(
            Salario.objects.filter(
                fecha_de_implementacion__lte=date.today()
            ).order_by('-fecha_de_implementacion'),
            "No existe un salario vigente configurado"
        )
        
   
        tiempo_trabajado = serializer.validated_data.get('tiempo_trabajado')
        if not tiempo_trabajado:
            raise serializers.ValidationError("Debe seleccionar una actividad válida")
            
  
        if not self.request.user.is_staff and tiempo_trabajado.usuario != self.request.user:
            raise serializers.ValidationError("No tiene permisos para acceder a esta actividad")
        
       
        periodo_inicio = serializer.validated_data['periodo_inicio']
        periodo_fin = serializer.validated_data['periodo_fin']
        
        if periodo_inicio > periodo_fin:
            raise serializers.ValidationError("La fecha de inicio no puede ser posterior a la fecha fin")
        

        pago = serializer.save(
            salario=salario_vigente,
            horas_trabajadas=0 
        )
        
        # 6. Calcular valores
        try:
            pago.calcular_total()
            pago.save()
        except Exception as e:
            pago.delete()
            raise serializers.ValidationError(f"Error en el cálculo del pago: {str(e)}")

    def create(self, request, *args, **kwargs):
        """Manejo personalizado de creación con mejor manejo de errores"""
        try:
         
            if 'tiempo_trabajado' not in request.data:
                return Response(
                    {"error": "El campo 'tiempo_trabajado' es requerido"},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            return super().create(request, *args, **kwargs)
            
        except serializers.ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
        except Exception as e:
            return Response(
                {"error": f"Error interno del servidor: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def update(self, request, *args, **kwargs):
        """Sobreescribir update para manejar campos read-only"""
        instance = self.get_object()
        
        if any(field in request.data for field in self.serializer_class.Meta.read_only_fields):
            return Response(
                {"error": "No se pueden modificar campos de solo lectura"},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        return super().update(request, *args, **kwargs)