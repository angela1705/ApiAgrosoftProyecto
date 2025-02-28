from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from apps.Cultivo.actividades.models import Actividad
from apps.Cultivo.actividades.api.serializers import ActividadSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead 

class ActividadViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrRead]  
    queryset = Actividad.objects.all()
    serializer_class = ActividadSerializer
