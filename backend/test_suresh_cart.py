import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory, force_authenticate
from cart.views import get_cart

user = User.objects.get(username="suresh")

factory = APIRequestFactory()
request = factory.get('/api/cart/')
force_authenticate(request, user=user)

try:
    response = get_cart(request)
    print("Response status:", response.status_code)
    print("Response data:", response.data)
except Exception as e:
    import traceback
    traceback.print_exc()
