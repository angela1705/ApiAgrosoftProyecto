from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView 
from rest_framework.permissions import AllowAny, IsAuthenticated
from apps.Usuarios.usuarios.models import Usuarios
from apps.Usuarios.usuarios.api.serializer import UsuariosSerializer, RegistroUsuarioSerializer
from rest_framework import viewsets
class UsuariosViewSet(viewsets.ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.rol.nombre.lower() == 'administrador':
            return Usuarios.objects.all()
        return Usuarios.objects.filter(id=user.id)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
class RegistroUsuarioView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = RegistroUsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        serializer = UsuariosSerializer(user)
        return Response(serializer.data)