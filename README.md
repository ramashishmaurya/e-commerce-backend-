# ELEVATE - Modern E-Commerce Platform

ELEVATE is a full-stack, modern e-commerce web application featuring a beautiful, dynamic user interface and a robust backend. It supports user authentication, product browsing, cart management, and a secure checkout flow.

## 🚀 Tech Stack

### Frontend
* **React** (Vite) for blazing fast development and optimized builds
* **React Router DOM** for seamless single-page application navigation
* **Context API** for global state management (Authentication and Cart)
* **Vanilla CSS** with a custom design system focusing on premium aesthetics, dark mode accents, and micro-animations

### Backend
* **Django** for the core backend architecture
* **Django REST Framework (DRF)** for building the API endpoints
* **PostgreSQL** as the primary relational database
* **Simple JWT** for secure, token-based user authentication and authorization

---

## ✨ Features

* **User Authentication:** Secure Sign Up and Log In using JSON Web Tokens (JWT).
* **Product Catalog:** Browse products fetched dynamically from the database.
* **Shopping Cart:** Add, view, and remove products. Features a live notification counter in the navigation bar using React Context.
* **Checkout Simulation:** A complete end-to-end checkout flow that clears the cart and securely registers an official `Order` in the backend database.
* **Django Admin Integration:** Easily manage Products, Categories, Users, Carts, and Orders through the built-in Django Admin interface.

---

## 🛠️ Local Development Setup

To run this project locally, you will need to start both the Django backend server and the React frontend development server.

### 1. Backend (Django) Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment (recommended):
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   ```
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up your `.env` file for PostgreSQL database credentials.
5. Apply database migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
6. Create a superuser to access the Django Admin panel:
   ```bash
   python manage.py createsuperuser
   ```
7. Start the development server:
   ```bash
   python manage.py runserver
   ```
   *The backend will run at http://127.0.0.1:8000/*

### 2. Frontend (React) Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend/frontend
   ```
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run at http://localhost:5173/*

---

## 🔒 Security (JWT)

This project strictly secures private routes. If a user attempts to add items to their cart or checkout without being logged in, they are redirected to the Login page. 
Tokens are safely stored in browser memory and passed via the `Authorization: Bearer <token>` header for all protected API calls.

## 👨‍💻 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.
