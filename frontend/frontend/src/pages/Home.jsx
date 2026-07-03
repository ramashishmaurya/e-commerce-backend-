import Hero from '../components/Hero';
import ProductList from './ProductList';

const Home = () => {
  return (
    <div>
      <Hero />
      <div className="container">
        <h2 className="section-title">New Arrivals</h2>
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
