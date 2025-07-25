from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from apps.Cultivo.calendario.models import Calendario
from apps.Cultivo.calendario.api.serializer import CalendarioSerializer

class CalendarioViewSet(viewsets.ModelViewSet):
    serializer_class = CalendarioSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Calendario.objects.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)