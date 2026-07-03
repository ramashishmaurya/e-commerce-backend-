from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view


from .models import Product, Category
from .serializers import ProductSerializers, CategorySerializers, UserSerializer
from rest_framework import status

@api_view(['POST'])
def register_user(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getproduct(request):
    productdata = Product.objects.all()
    serializer = ProductSerializers(productdata, many=True, context={'request': request})
    return Response(serializer.data)


@api_view(['GET'])
def getcategory(request):
    categorydata = Category.objects.all()
    serializer = CategorySerializers(categorydata, many=True)
    return Response(serializer.data)