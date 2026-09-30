import React from 'react';

export default function ProductList({ products, onAddToCart }) {
  return (
    <div style={{ flex: '1', minWidth: '300px' }}>
      <h3>🛍️ Available Products</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '15px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', textAlign: 'center', background: '#fff' }}>
            <h4>{product.name}</h4>
            <p style={{ fontWeight: 'bold', color: '#2c3e50' }}>₹{product.price}</p>
            <button
              onClick={() => onAddToCart(product)}
              style={{ padding: '8px 12px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}