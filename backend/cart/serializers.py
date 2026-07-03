from rest_framework import serializers
# pyrefly: ignore [missing-import]
from .models import Cart, CartItem
from store.serializers import ProductSerializers

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializers(read_only=True)
    product_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'total_price', 'created_at']

    def get_total_price(self, obj):
        return sum(item.quantity * item.product.price for item in obj.items.all())
