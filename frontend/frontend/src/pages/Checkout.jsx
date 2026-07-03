import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';
import AuthContext from '../context/AuthContext';

const Checkout = () => {
    const { cartItems, totalPrice, fetchCart, cartCount } = useContext(CartContext);
    const { authTokens } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    
    useEffect(() => {
        if (!authTokens) {
            navigate('/login');
        } else if (cartCount === 0 && !success) {
            navigate('/cart');
        }
    }, [authTokens, cartCount, navigate, success]);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await fetch('http://127.0.0.1:8000/api/cart/checkout/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setSuccess(true);
                fetchCart(); // This will clear the cart globally
            } else {
                alert('Checkout failed. Please try again.');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Could not connect to the server.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="container" style={{ padding: '100px 20px', textAlign: 'center', minHeight: '60vh' }}>
                <h1 style={{ color: '#4CAF50', fontSize: '3rem', marginBottom: '20px' }}>Payment Successful! 🎉</h1>
                <p style={{ fontSize: '1.2rem', color: '#ccc', marginBottom: '40px' }}>
                    Thank you for your order. Your items will be shipped soon.
                </p>
                <button onClick={() => navigate('/')} className="btn-primary" style={{ padding: '15px 30px', fontSize: '1.1rem' }}>
                    Continue Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '60px 20px', minHeight: '60vh' }}>
            <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>Secure Checkout</h1>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', maxWidth: '1000px', margin: '0 auto' }}>
                {/* Payment Form */}
                <div style={{ backgroundColor: '#111', padding: '30px', borderRadius: '10px' }}>
                    <h2 style={{ marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Shipping & Payment</h2>
                    <form onSubmit={handlePayment}>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label className="form-label">Full Name</label>
                            <input type="text" className="form-input" required defaultValue="Demo User" />
                        </div>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label className="form-label">Shipping Address</label>
                            <textarea className="form-input" required rows="3" defaultValue="123 Main St, Tech City, 10001"></textarea>
                        </div>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label className="form-label">Credit Card Number</label>
                            <input type="text" className="form-input" required placeholder="XXXX-XXXX-XXXX-XXXX" defaultValue="4242-4242-4242-4242" />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
                            <div className="form-group">
                                <label className="form-label">Expiry (MM/YY)</label>
                                <input type="text" className="form-input" required defaultValue="12/26" />
                            </div>
                            <div className="form-group">
                                <label className="form-label">CVV</label>
                                <input type="password" className="form-input" required defaultValue="123" />
                            </div>
                        </div>
                        
                        <button 
                            type="submit" 
                            className="btn-primary" 
                            style={{ width: '100%', padding: '15px', fontSize: '1.1rem', backgroundColor: '#4CAF50', border: 'none' }}
                            disabled={loading}
                        >
                            {loading ? 'Processing...' : `Pay $${Number(totalPrice).toFixed(2)}`}
                        </button>
                        <p style={{ textAlign: 'center', marginTop: '15px', color: '#888', fontSize: '0.9rem' }}>
                            This is a simulated payment. No real charges are made.
                        </p>
                    </form>
                </div>

                {/* Order Summary */}
                <div style={{ backgroundColor: '#1a1a1a', padding: '30px', borderRadius: '10px', height: 'fit-content' }}>
                    <h2 style={{ marginBottom: '20px', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Order Summary</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
                        {cartItems.map(item => (
                            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <span style={{ backgroundColor: '#333', padding: '2px 8px', borderRadius: '5px', fontSize: '0.9rem' }}>{item.quantity}x</span>
                                    <span>{item.product.name}</span>
                                </div>
                                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #333', paddingTop: '20px', marginTop: '20px', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        <span>Total:</span>
                        <span style={{ color: '#4CAF50' }}>${Number(totalPrice).toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
