import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User
from store.models import Product
from cart.models import Cart, CartItem
from cart.serializers import CartSerializer
from rest_framework.test import APIRequestFactory
from cart.views import get_cart

# Create dummy user
user, _ = User.objects.get_or_create(username="testuser", email="test@test.com")
user.set_password("password")
user.save()

# Get a product
product = Product.objects.first()
if not product:
    print("No products found to test with.")
    exit()

# Add to cart
cart, _ = Cart.objects.get_or_create(user=user)
CartItem.objects.create(cart=cart, product=product, quantity=1)

# Test serializer
factory = APIRequestFactory()
request = factory.get('/api/cart/')
request.user = user

response = get_cart(request)
print("Response status:", response.status_code)
print("Response data:", response.data)

