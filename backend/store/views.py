from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import Product, Category
from .serializers import ProductSerializers, CategorySerializers


@api_view(['GET'])
def getproduct(request):
    productdata = Product.objects.all()
    serializer = ProductSerializers(productdata, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getcategory(request):
    categorydata = Category.objects.all()
    serializer = CategorySerializers(categorydata, many=True)
    return Response(serializer.data)