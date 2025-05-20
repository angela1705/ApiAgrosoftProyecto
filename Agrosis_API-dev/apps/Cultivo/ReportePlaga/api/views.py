from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.Cultivo.ReportePlaga.models import ReportePlaga
from apps.Cultivo.ReportePlaga.api.serializers import ReportePlagaSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead, PermisoPorRol
from apps.Cultivo.ReportePlaga.api.signals import notificar_reporte_plaga, notificar_cambio_estado_plaga
from apps.Usuarios.usuarios.models import Usuarios
import logging
logger = logging.getLogger(__name__)

class ReportePlagaViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrRead, PermisoPorRol] 
    queryset = ReportePlaga.objects.all()
    serializer_class = ReportePlagaSerializer
    
    def perform_create(self, serializer):
        reporte = serializer.save(usuario=self.request.user)
        
        try:
            admin_ids = Usuarios.objects.filter(
                rol__nombre='Administrador',
                is_active=True
            ).values_list('id', flat=True)
            
          
            
            notificar_reporte_plaga(reporte, admin_ids)
        except Exception as e:
            logger.error(f"Error al notificar administradores: {str(e)}")
            # Continúa aunque falle la notificación

    def perform_update(self, serializer):
        reporte = serializer.save()
        notificar_reporte_plaga(reporte)
    
    @action(detail=True, methods=['post'])
    def revisar(self, request, pk=None):
        reporte = self.get_object()
        reporte.estado = 'RE'
        reporte.save()
        notificar_cambio_estado_plaga(reporte)
        return Response({'status': 'Reporte marcado como revisado'})
    
    @action(detail=True, methods=['post'])
    def atender(self, request, pk=None):
        reporte = self.get_object()
        reporte.estado = 'AT'
        reporte.save()
        notificar_cambio_estado_plaga(reporte)
        return Response({'status': 'Reporte marcado como atendido'})