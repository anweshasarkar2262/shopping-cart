import React, { useState } from 'react';
import ProductList from './components/ProductList';
import CartTable from './components/CartTable';
import CartSummary from './components/CartSummary';


const initialProducts = [
  { id: 1, name: 'Organic Fertilizer (5kg)', price: 450 },
  { id: 2, name: 'Drip Irrigation Kit', price: 1200 },
  { id: 3, name: 'Wheat Seeds (1kg)', price: 180 },
  { id: 4, name: 'Garden Pruning Shears', price: 350 }
];


const availableCoupons = {
  SAVE10: 10,
  FARMSUPER20: 20
};

export default function App() {
  const [cart, setCart] = useState([]);

  
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingIndex].quantity += 1;
        return updatedCart;
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  
  const handleRemoveItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div style={{ maxWidth: '1000px', margin: '20px auto', fontFamily: 'Arial, sans-serif', padding: '0 15px' }}>
      <h2>🛒 Online Shopping Cart</h2>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {/* Left Column: Product List */}
        <ProductList products={initialProducts} onAddToCart={handleAddToCart} />

        {/* Right Column: Cart Table & Billing Summary */}
        <div style={{ flex: '1.2', minWidth: '320px' }}>
          <h3>🛒 Your Shopping Cart</h3>
          <CartTable
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />

          {cart.length > 0 && (
            <CartSummary subtotal={subtotal} availableCoupons={availableCoupons} />
          )}
        </div>
      </div>
    </div>
  );
}