import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { fetchCart } = useContext(CartContext);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  // Use a fallback image if the backend doesn't provide one
  const imageUrl = product.image || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop";

  const handleAddToCart = async () => {
    let token = null;
    const authTokens = localStorage.getItem('authTokens');
    if (authTokens) {
        token = JSON.parse(authTokens).access;
    }

    if (!token) {
      alert("Please log in to add items to your cart!");
      navigate('/login');
      return;
    }

    setAdding(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/cart/add/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ product_id: product.id })
      });

      if (response.ok) {
        setAdded(true);
        fetchCart(); // Update global cart count
        setTimeout(() => setAdded(false), 2000); // Reset button after 2 seconds
      } else {
        alert("Failed to add to cart. Please log in again.");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Could not connect to the server.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={imageUrl} 
          alt={product.name || product.title || "Product"} 
          className="product-image"
        />
        <div className="product-overlay">
          <button 
            className="btn-quick-add" 
            onClick={handleAddToCart}
            disabled={adding || added}
            style={added ? {backgroundColor: '#4CAF50', color: 'white', border: 'none'} : {}}
          >
            {adding ? "Adding..." : added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-title">{product.name || product.title || "Premium Item"}</h3>
        <p className="product-price">${product.price || "99.00"}</p>
      </div>
    </div>
  );
};

export default ProductCard;
