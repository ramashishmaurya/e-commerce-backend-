# import os
# import urllib.request
# from django.core.management.base import BaseCommand
# from django.core.files.base import ContentFile
# from store.models import Category, Product

# class Command(BaseCommand):
#     help = 'Seeds the database with premium clothing products.'

#     def handle(self, *args, **kwargs):
#         self.stdout.write('Seeding clothing products...')

#         # Clean existing data
#         Product.objects.all().delete()
#         Category.objects.all().delete()

#         # Create Category
#         category = Category.objects.create(name='Clothing', slug='clothing')

#         # Dummy Products matching frontend
#         products_data = [
#             {
#                 "name": "Essential Cotton Tee",
#                 "price": "45.00",
#                 "description": "A premium, ultra-soft cotton tee perfect for everyday wear.",
#                 "image_url": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop"
#             },
#             {
#                 "name": "Classic Denim Jacket",
#                 "price": "120.00",
#                 "description": "Timeless denim jacket with a modern tailored fit.",
#                 "image_url": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop"
#             },
#             {
#                 "name": "Minimalist Linen Shirt",
#                 "price": "85.00",
#                 "description": "Breathable and lightweight linen shirt for summer.",
#                 "image_url": "https://images.unsplash.com/photo-1596755094514-f87e32f85e2c?w=800&auto=format&fit=crop"
#             },
#             {
#                 "name": "Tailored Trousers",
#                 "price": "110.00",
#                 "description": "Elegant trousers designed for both comfort and style.",
#                 "image_url": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&auto=format&fit=crop"
#             }
#         ]

#         for i, item in enumerate(products_data):
#             self.stdout.write(f'Creating product: {item["name"]}')
            
#             product = Product(
#                 Category=category,
#                 name=item['name'],
#                 price=item['price'],
#                 description=item['description'],
#                 image=item['image_url']
#             )

#             product.save()

#         self.stdout.write(self.style.SUCCESS('Successfully seeded the database!'))
