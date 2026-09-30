import React from 'react';

export default function CartTable({ cart, onUpdateQuantity, onRemoveItem }) {
  if (cart.length === 0) {
    return (
      <div style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', textAlign: 'center', background: '#f8f9fa' }}>
        <p>Your cart is empty. Add items from the product list!</p>
      </div>
    );
  }

  return (
    <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: '#fff' }}>
      <thead style={{ background: '#343a40', color: '#fff' }}>
        <tr>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {cart.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>₹{item.price}</td>
            <td>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                style={{ padding: '2px 8px', marginRight: '5px', cursor: 'pointer' }}
              >
                -
              </button>
              <strong style={{ margin: '0 5px' }}>{item.quantity}</strong>
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                style={{ padding: '2px 8px', marginLeft: '5px', cursor: 'pointer' }}
              >
                +
              </button>
            </td>
            <td>₹{item.price * item.quantity}</td>
            <td>
              <button
                onClick={() => onRemoveItem(item.id)}
                style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}