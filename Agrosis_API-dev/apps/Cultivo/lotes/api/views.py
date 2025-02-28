from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from apps.Cultivo.lotes.models import Lote
from apps.Cultivo.lotes.api.serializers import LoteSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead 

class LoteViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrRead] 
    queryset = Lote.objects.all()
    serializer_class = LoteSerializer
