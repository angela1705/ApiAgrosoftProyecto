from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from ..models import BodegaHerramienta
from .serializers import BodegaHerramientaSerializer

class BodegaHerramientaViewSet(viewsets.ModelViewSet):
    queryset = BodegaHerramienta.objects.all()
    serializer_class = BodegaHerramientaSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        print(" Datos recibidos:", request.data)  # Imprime la solicitud en la consola
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        print(" Errores de validación:", serializer.errors)  # Muestra los errores si hay problemas
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
