from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from apps.Cultivo.plagas.models import Plaga
from apps.Cultivo.plagas.api.serializers import PlagaSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead 

class PlagaViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrRead] 
    queryset = Plaga.objects.all()
    serializer_class = PlagaSerializer
