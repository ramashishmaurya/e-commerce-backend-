from django.contrib import admin
from .models import Cart, CartItem

# Register your models here.

admin.site.register(Cart)
admin.site.register(CartItem)

# # pyrefly: ignore [missing-import]
# from .models import cart , cartitems

# admin.site.register(cart)
# admin.site.register(cartitems)