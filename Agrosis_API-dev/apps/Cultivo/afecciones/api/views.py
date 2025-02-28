from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from apps.Cultivo.afecciones.models import Afeccion
from apps.Cultivo.afecciones.api.serializers import AfeccionSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead 


class AfeccionViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrRead] 
    queryset = Afeccion.objects.all()
    serializer_class = AfeccionSerializer
