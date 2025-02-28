from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from apps.Cultivo.bancal.models import Bancal
from apps.Cultivo.bancal.api.serializers import BancalSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead 

class BancalViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrRead] 
    queryset = Bancal.objects.all()
    serializer_class = BancalSerializer
