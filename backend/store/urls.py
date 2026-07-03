# pyrefly: ignore [missing-import]
from .import views
from django.urls import path


# pyrefly: ignore [missing-import]
from . views import getproduct, getcategory, register_user
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('products/', views.getproduct),
    path('category/' , views.getcategory),
    path('register/', register_user, name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

