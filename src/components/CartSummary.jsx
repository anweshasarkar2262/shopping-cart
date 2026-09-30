import React, { useState } from 'react';

export default function CartSummary({ subtotal, availableCoupons }) {
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // Discount percentage
  const [couponMessage, setCouponMessage] = useState('');

  
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();

    if (availableCoupons[code]) {
      const discountPercent = availableCoupons[code];
      setAppliedDiscount(discountPercent);
      setCouponMessage(`Success! ${discountPercent}% discount applied.`);
    } else {
      setAppliedDiscount(0);
      setCouponMessage('Invalid coupon code. Try "SAVE10" or "FARMSUPER20".');
    }
  };

  
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const priceAfterDiscount = subtotal - discountAmount;
  const gstAmount = priceAfterDiscount * 0.18; // 18% GST Rate
  const grandTotal = priceAfterDiscount + gstAmount;

  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px', background: '#f8f9fa', marginTop: '20px' }}>
      <h3>🏷️ Billing & Checkout Summary</h3>

      {/* Coupon Form */}
      <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Enter Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          style={{ flex: '1', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Apply
        </button>
      </form>

      {couponMessage && (
        <p style={{ color: appliedDiscount > 0 ? 'green' : 'red', fontSize: '14px', marginTop: '-5px' }}>
          {couponMessage}
        </p>
      )}

      {/* Summary Calculations */}
      <div style={{ lineHeight: '1.8' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Subtotal:</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        {appliedDiscount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'green' }}>
            <span>Discount ({appliedDiscount}%):</span>
            <span>- ₹{discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>GST (18%):</span>
          <span>+ ₹{gstAmount.toFixed(2)}</span>
        </div>

        <hr />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
          <span>Grand Total:</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}