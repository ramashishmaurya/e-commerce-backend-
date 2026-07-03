import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const { cartCount } = useContext(CartContext);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="brand-logo">ELEVATE</Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/shop" className="nav-link">Shop</Link>
          <Link to="/collections" className="nav-link">Collections</Link>
          <Link to="/about" className="nav-link">About</Link>
        </div>
        <div className="nav-actions">
          {user ? (
            <>
              <Link to="/cart" className="nav-btn-primary" style={{marginRight: '15px', backgroundColor: '#fff', color: '#000', padding: '8px 15px', borderRadius: '5px', textDecoration: 'none', fontWeight: 'bold'}}>
                🛒 Cart {cartCount > 0 && <span style={{backgroundColor: '#ff4444', color: '#fff', borderRadius: '50%', padding: '2px 6px', marginLeft: '5px', fontSize: '0.8rem'}}>{cartCount}</span>}
              </Link>
              <span className="nav-user-greeting">Hi, {user.username}</span>
              <button onClick={logoutUser} className="nav-btn-logout">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline">Login</Link>
              <Link to="/signup" className="btn-primary">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
