import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
// import axiosInstance from "../utils/axiosInstance";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // We can use standard fetch or our axiosInstance if we need authentication.
    // Assuming products are public for now.
    fetch("http://127.0.0.1:8000/api/products/")  
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Could not connect to the backend server. Please make sure it is running.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px 0' }}>Loading collection...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', padding: '100px 0', color: 'red' }}>{error}</div>;
  }

  if (products.length === 0) {
    return <div style={{ textAlign: 'center', padding: '100px 0' }}>No products available yet. Add some in the Django Admin!</div>;
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductList;
