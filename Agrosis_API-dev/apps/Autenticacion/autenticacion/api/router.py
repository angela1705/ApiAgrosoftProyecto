from django.urls import path
from .views import LoginConCookieView, LogoutConCookieView

urlpatterns = [
    path('login/', LoginConCookieView.as_view(), name='auth'),
    path('logout/', LogoutConCookieView.as_view(), name='logout'),
]
