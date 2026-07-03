import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCart = async () => {
            let token = null;
            const authTokens = localStorage.getItem('authTokens');
            if (authTokens) {
                token = JSON.parse(authTokens).access;
            }

            if (!token) {
                alert("Please log in to view your cart");
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:8000/api/cart/', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setCartItems(data.items || []);
                    setTotalPrice(data.total_price || 0);
                }
                setLoading(false);
            } catch (error) {
                console.error("Error fetching cart:", error);
                setLoading(false);
            }
        };

        fetchCart();
    }, [navigate]);

    const removeItem = async (itemId) => {
        let token = null;
        const authTokens = localStorage.getItem('authTokens');
        if (authTokens) {
            token = JSON.parse(authTokens).access;
        }
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/cart/remove/${itemId}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                // Remove item from state
                setCartItems(cartItems.filter(item => item.id !== itemId));
                // We'd realistically want to re-fetch the total price here, or manually calculate it
                window.location.reload(); // Simple reload to refresh cart data for now
            }
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    return (
        <div className="container" style={{ padding: '40px 20px', minHeight: '60vh' }}>
            <h1 style={{ marginBottom: '30px' }}>Your Cart</h1>
            
            {loading ? (
                <p>Loading cart...</p>
            ) : cartItems.length === 0 ? (
                <p>Your cart is currently empty. Start shopping!</p>
            ) : (
                <div>
                    <div style={{ display: 'grid', gap: '20px', marginBottom: '40px' }}>
                        {cartItems.map(item => (
                            <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', backgroundColor: '#111', borderRadius: '10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                    <img 
                                        src={item.product.image || "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&auto=format&fit=crop"} 
                                        alt={item.product.name} 
                                        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }} 
                                    />
                                    <div>
                                        <h3>{item.product.name}</h3>
                                        <p style={{ color: '#888' }}>Quantity: {item.quantity}</p>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${(item.product.price * item.quantity).toFixed(2)}</p>
                                    <button onClick={() => removeItem(item.id)} style={{ background: 'transparent', color: '#ff4444', border: 'none', cursor: 'pointer', marginTop: '10px' }}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px', backgroundColor: '#1a1a1a', borderRadius: '10px' }}>
                        <h2>Total:</h2>
                        <h2 style={{ color: '#fff' }}>${Number(totalPrice).toFixed(2)}</h2>
                    </div>
                    
                    <div style={{ textAlign: 'right', marginTop: '30px' }}>
                        <Link to="/checkout" className="btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem', textDecoration: 'none', display: 'inline-block' }}>Proceed to Checkout</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
