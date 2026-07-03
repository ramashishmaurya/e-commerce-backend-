import { createContext, useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';

const CartContext = createContext();
export default CartContext;

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const { authTokens } = useContext(AuthContext);

    const fetchCart = async () => {
        if (!authTokens) {
            setCartItems([]);
            setCartCount(0);
            return;
        }

        try {
            const token = authTokens.access;
            const response = await fetch('http://127.0.0.1:8000/api/cart/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setCartItems(data.items || []);
                setTotalPrice(data.total_price || 0);
                
                // Calculate total count
                const count = (data.items || []).reduce((acc, item) => acc + item.quantity, 0);
                setCartCount(count);
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    // Fetch cart whenever authTokens change (e.g. login/logout)
    useEffect(() => {
        fetchCart();
    }, [authTokens]);

    return (
        <CartContext.Provider value={{ cartItems, totalPrice, cartCount, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};
