from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated 
from rest_framework import viewsets
from apps.Finanzas.salario.models import Salario
from apps.Finanzas.salario.api.serializers import SalarioSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead, PermisoPorRol
from rest_framework.decorators import action
from apps.Usuarios.roles.models import Roles

class SalarioViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrRead, PermisoPorRol]
    queryset = Salario.objects.all()
    serializer_class = SalarioSerializer
    @action(detail=False, methods=['get'])
    def actuales(self, request):
        # Obtener el salario activo más reciente para cada rol
        salarios = []
        roles    = Roles.objects.all()
        
        for rol in roles:
            salario = Salario.objects.filter(
                rol=rol,
                activo=True
            ).order_by('-fecha_de_implementacion').first()
            
            if salario:
                salarios.append(salario)
        
        serializer = self.get_serializer(salarios, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        # Al crear un nuevo salario, desactivar los anteriores para el mismo rol
        rol = serializer.validated_data['rol']
        Salario.objects.filter(rol=rol, activo=True).update(activo=False)
        serializer.save(activo=True)
