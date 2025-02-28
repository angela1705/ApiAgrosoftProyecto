from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from apps.Cultivo.tipo_plaga.models import TipoPlaga
from apps.Cultivo.tipo_plaga.api.serializers import TipoPlagaSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead 

class TipoPlagaViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrRead] 
    queryset = TipoPlaga.objects.all()
    serializer_class = TipoPlagaSerializer
