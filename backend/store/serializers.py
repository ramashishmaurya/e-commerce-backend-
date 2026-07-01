from rest_framework import serializers
from .models import Product , Category

class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializers(serializers.ModelSerializer):
    category = CategorySerializers(read_only = True)

    class Meta:
        model = Product 
        field = '__all__'

