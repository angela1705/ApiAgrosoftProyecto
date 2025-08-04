
from django.contrib.auth.backends import ModelBackend
from apps.Usuarios.usuarios.models import Usuarios  

class EmailBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        try:
            user = Usuarios.objects.get(email=email)
            if user.check_password(password):
                return user
        except Usuarios.DoesNotExist:
            return None
