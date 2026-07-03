import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="hero">
      <img 
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
        alt="Fashion Model" 
        className="hero-bg" 
      />
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <span className="hero-subtitle">The Summer Collection</span>
        <h1 className="hero-title">Elevate Your Everyday Style.</h1>
        <Link to="/shop" className="btn-primary" style={{ padding: '16px 40px', fontSize: '1rem' }}>
          Explore Collection
        </Link>
      </div>
    </section>
  );
};

export default Hero;
