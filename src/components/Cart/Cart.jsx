import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FaTrashAlt } from 'react-icons/fa';
import PaymentOptions from '../Payment/PaymentOption';

const Cart = () => {
  const { cartItems, updateItemQuantity, removeItem, clearCart } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isPaymentOptionsOpen, setPaymentOptionsOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notification, setNotification] = useState('');

  const handleCouponApply = () => {
    // Implement coupon application logic
    const discountValue = applyCoupon(coupon);
    if (discountValue) {
      setDiscount(discountValue);
    } else {
      setNotification('Invalid coupon code');
    }
  };

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      updateItemQuantity(id, quantity);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountedTotal = total - discount;

  const isPhoneNumberValid = phoneNumber.length === 10 || phoneNumber.length === 11;

  const handlePlaceOrder = () => {
    if (!userName || !isPhoneNumberValid) {
      setNotification('Please fill in your name and a valid phone number');
      return;
    }
    setPaymentOptionsOpen(true);
  };

  const handlePaymentSuccess = (paymentMethod) => {
    const orderDetails = cartItems.map(item => `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`).join('\n');
    const messageTemplate = `Name: ${userName}\nPhone: ${phoneNumber}\nOrder Details:${orderDetails}\nTotal: ₹${discountedTotal}\nPayment Method: ${paymentMethod}`;

    // Display the receipt to the user
    const receipt = `
      ==========================
      ORDER RECEIPT
      ==========================
      Name: ${userName}
      Phone: ${phoneNumber}
      Date: ${new Date().toLocaleString()}
      --------------------------------
      ${orderDetails}
      --------------------------------
      Discount: -₹${discount.toFixed(2)}
      Amount to Pay: ₹${discountedTotal.toFixed(2)}
      Payment Method: ${paymentMethod}
      ==========================
    `;

    alert(receipt); // Show the receipt to the user

    // Send the receipt to the admin via SMS
    const encodedMessage = encodeURIComponent(receipt);
    const adminPhoneNumber = '8668722207';
    window.location.href = `sms:${adminPhoneNumber}?body=${encodedMessage}`;

    clearCart();  // Clear the cart after successful payment
    setNotification('Order placed successfully!');
    setPaymentOptionsOpen(false);
  };

  const handlePaymentOptionsClose = () => {
    setPaymentOptionsOpen(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-3 text-slate-800">Your Cart</h2>
      {notification && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
          {notification}
        </div>
      )}
      {cartItems.length > 0 ? (
        <div>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex flex-col md:flex-row items-start bg-white rounded-lg shadow-lg mb-4 p-4 relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full md:w-32 h-32 object-cover rounded-lg mb-4 md:mb-0"
                />
                <div className="flex-grow pl-4">
                  <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                  <p className="text-lg font-bold text-gray-800 mb-2">₹{item.price}</p>
                  <div className="flex items-center mb-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-transform duration-300"
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span className="mx-4 text-lg font-medium">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-transform duration-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-4 right-4 p-2 bg-slate-900 text-white rounded-full hover:bg-red-600 transition-transform duration-300"
                >
                  <FaTrashAlt className="h-5 w-5" />
                </button>
              </li>
            ))}

          </ul>
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Coupon Code</label>
              <div className="flex">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="mt-1 p-2 border rounded-lg flex-grow"
                  placeholder="Enter coupon code"
                />
                <button
                  onClick={handleCouponApply}
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-transform duration-300"
                >
                  Apply
                </button>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-lg font-semibold">Total: ₹{total.toFixed(2)}</p>
              {discount > 0 && <p className="text-lg font-semibold">Discount: -₹{discount.toFixed(2)}</p>}
              <p className="text-xl font-bold">Amount to Pay: ₹{discountedTotal.toFixed(2)}</p>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-1 p-2 border rounded-lg w-full"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 p-2 border rounded-lg w-full"
                placeholder="Enter your phone number"
              />
            </div>
            <button
              onClick={handlePlaceOrder}
              className={`mt-4 px-6 py-3 text-white rounded-lg ${userName && isPhoneNumberValid ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!userName || !isPhoneNumberValid}
            >
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg p-6">
          <img
            src="https://cdn-icons-png.flaticon.com/128/17541/17541640.png"
            alt="Empty Cart"
            className="w-24 h-24 mb-4"
          />
          <p className="text-lg font-semibold text-gray-700">Your cart is empty</p>
          <p className="text-gray-500">Add some items to your cart to proceed</p>
        </div>
      )}
      {isPaymentOptionsOpen && (
        <PaymentOptions
          amount={discountedTotal}
          userName={userName}
          phoneNumber={phoneNumber}
          cartItems={cartItems}
          onSuccess={handlePaymentSuccess}
          onClose={handlePaymentOptionsClose}
        />
      )}
    </div>
  );
};

export default Cart;
