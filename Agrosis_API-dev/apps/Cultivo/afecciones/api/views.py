from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.Cultivo.afecciones.models import Afeccion
from apps.Cultivo.afecciones.api.serializers import AfeccionSerializer
from apps.Usuarios.usuarios.api.permissions import IsAdminOrRead, PermisoPorRol

class AfeccionViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsAdminOrRead, PermisoPorRol]
    queryset = Afeccion.objects.all()
    serializer_class = AfeccionSerializer

    @action(detail=True, methods=['post'])
    def cambiar_estado(self, request, pk=None):
        afeccion = self.get_object()
        nuevo_estado = request.data.get('estado')

        # Verifica si el estado es válido
        estados_validos = dict(Afeccion._meta.get_field('estado').choices).keys()
        if nuevo_estado not in estados_validos:
            return Response(
                {'error': f'Estado no válido. Estados permitidos: {", ".join(estados_validos)}'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            afeccion.estado = nuevo_estado
            afeccion.save()

            serializer = self.get_serializer(afeccion)
            return Response(
                {
                    'status': 'Estado actualizado',
                    'afeccion': serializer.data
                },
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
