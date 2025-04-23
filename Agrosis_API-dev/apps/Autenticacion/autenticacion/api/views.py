from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate

class LoginConCookieView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        # Autenticar usuario con el backend configurado (usando email y password)
        user = authenticate(request, email=email, password=password)

        if user is not None:
            # Generar tokens
            refresh = RefreshToken.for_user(user)
            access = str(refresh.access_token)

            # Crear la respuesta con las cookies
            response = Response({"message": "Login exitoso"}, status=200)
            response.set_cookie(
                key="access_token",
                value=access,
                httponly=True,
                secure=False,  # Cambiar a True en producción
                samesite="Lax"
            )
            response.set_cookie(
                key="refresh_token",
                value=str(refresh),
                httponly=True,
                secure=False,  # Cambiar a True en producción
                samesite="Lax"
            )
            return response
        else:
            return Response({"error": "Credenciales inválidas"}, status=401)

class LogoutConCookieView(APIView):
    def post(self, request):
        response = Response({"message": "Sesión cerrada"}, status=200)
        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")
        return response
