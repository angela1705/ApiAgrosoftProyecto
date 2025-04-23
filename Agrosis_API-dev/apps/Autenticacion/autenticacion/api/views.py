from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny

class LoginConCookieView(APIView):
    permission_classes = [AllowAny]  

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, email=email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            access = str(refresh.access_token)

            response = Response({
                "message": "Login exitoso",
                "access": access,
                "refresh": str(refresh),
                "user_id": user.id,
                "email": user.email
            }, status=200)

            response.set_cookie(
                key="access_token",
                value=access,
                httponly=True,
                secure=False,
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
