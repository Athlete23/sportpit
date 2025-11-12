import { useState } from 'react';
import { Hero } from './components/Hero';
import { Products } from './components/Products';
import { OrderForm } from './components/OrderForm';
import { Footer } from './components/Footer';

function App() {
  const [selectedProduct, setSelectedProduct] = useState('Протеин Whey Premium');
  const [selectedPrice, setSelectedPrice] = useState(2499);

  const handleProductSelect = (productName: string, price: number) => {
    setSelectedProduct(productName);
    setSelectedPrice(price);
  };

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Products onProductSelect={handleProductSelect} />
      <OrderForm selectedProduct={selectedProduct} selectedPrice={selectedPrice} />
      <Footer />
    </div>
  );
}

export default App;
