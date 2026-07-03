from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem
from .serializers import CartSerializer
from store.models import Product

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    serializer = CartSerializer(cart, context={'request': request})
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    product_id = request.data.get('product_id')
    
    if not product_id:
        return Response({'error': 'Product ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
    product = get_object_or_404(Product, id=product_id)
    
    # Get or create cart item
    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    
    if not created:
        cart_item.quantity += 1
        cart_item.save()
        
    return Response({'message': 'Product added to cart successfully'}, status=status.HTTP_200_OK)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, item_id):
    cart_item = get_object_or_404(CartItem, id=item_id, cart__user=request.user)
    cart_item.delete()
    return Response({'message': 'Item removed from cart'}, status=status.HTTP_200_OK)

from store.models import Order, OrderIterms
from decimal import Decimal

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def checkout(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    items = cart.items.all()
    
    if not items.exists():
        return Response({'error': 'Your cart is empty.'}, status=status.HTTP_400_BAD_REQUEST)
        
    # Calculate total amount
    total_amount = sum(item.quantity * item.product.price for item in items)
    
    # Create the Order
    order = Order.objects.create(
        user=request.user,
        total_amount=total_amount
    )
    
    # Create Order Items
    for item in items:
        OrderIterms.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=item.product.price
        )
        
    # Empty the cart
    items.delete()
    
    return Response({
        'message': 'Order placed successfully!',
        'order_id': order.id,
        'total_amount': total_amount
    }, status=status.HTTP_200_OK)
