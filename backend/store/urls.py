from .import views
from django.urls import path
from . views import getproduct  , getcategory

urlpatterns = [
    path('products/', views.getproduct),
    path('category/' , views.getcategory) , 
]