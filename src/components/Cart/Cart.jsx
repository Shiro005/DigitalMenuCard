import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, updateItemQuantity, removeItem, applyCoupon } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleCouponApply = () => {
    const discountValue = applyCoupon(coupon);
    if (discountValue) {
      setDiscount(discountValue);
    } else {
      alert('Invalid coupon code');
      setDiscount(0);
    }
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      updateItemQuantity(id, quantity);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountedTotal = total - discount;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length > 0 ? (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="mb-4 flex items-center justify-between">
                <img src={item.image} alt={item.name} className="w-16 h-16 mr-4" />
                <div className="flex-grow">
                  <p className="font-bold">{item.name}</p>
                  <p>{item.description}</p>
                  <p>₹{item.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <label className="block mb-2 font-bold">Apply Coupon</label>
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="border p-2 w-full mb-2"
              placeholder="Enter coupon code"
            />
            <button
              onClick={handleCouponApply}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Apply
            </button>
          </div>
          <div className="mt-4">
            <label className="block mb-2 font-bold">User Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="border p-2 w-full mb-2"
              placeholder="Enter your name"
            />
            <label className="block mb-2 font-bold">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border p-2 w-full mb-2"
              placeholder="Enter your phone number"
            />
          </div>
          <div className="mt-4">
            <p className="text-lg font-bold">Bill Summary</p>
            <p>Total: ₹{total.toFixed(2)}</p>
            {discount > 0 && <p>Discount: -₹{discount.toFixed(2)}</p>}
            <p className="font-bold">Amount to Pay: ₹{discountedTotal.toFixed(2)}</p>
          </div>
          <button
            onClick={() => alert('Order placed!')}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          >
            Place Order
          </button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
