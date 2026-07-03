import requests

BASE_URL = "http://127.0.0.1:8000"

# 1. Login to get token
response = requests.post(f"{BASE_URL}/api/token/", json={
    "username": "admin",
    "password": "admin123"
})
if response.status_code != 200:
    print("Failed to login", response.json())
    exit()

token = response.json().get("access")
headers = {"Authorization": f"Bearer {token}"}

# 2. Add product to cart
print("Adding product 1 to cart...")
response = requests.post(f"{BASE_URL}/api/cart/add/", json={"product_id": 1}, headers=headers)
print("Add response:", response.status_code, response.text)

# 3. Get cart
print("Fetching cart...")
response = requests.get(f"{BASE_URL}/api/cart/", headers=headers)
print("Cart response:", response.status_code, response.text)
