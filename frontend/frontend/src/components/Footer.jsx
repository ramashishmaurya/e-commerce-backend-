const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <h3 className="footer-brand">ELEVATE</h3>
            <p className="footer-desc">Premium minimalist clothing designed for the modern individual.</p>
          </div>
          <div>
            <h4 className="footer-title">Shop</h4>
            <ul className="footer-links">
              <li><a href="#">New Arrivals</a></li>
              <li><a href="#">Best Sellers</a></li>
              <li><a href="#">Men's Collection</a></li>
              <li><a href="#">Women's Collection</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Help</h4>
            <ul className="footer-links">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Shipping & Returns</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Size Guide</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Follow Us</h4>
            <ul className="footer-links">
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Pinterest</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} ELEVATE Clothing Co. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
