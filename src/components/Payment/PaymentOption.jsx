import React, { useState } from 'react';

const PaymentOptions = ({ amount, userName, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [userDetails, setUserDetails] = useState({
    name: '',
    phoneNumber: '',
  });
  const [receiptVisible, setReceiptVisible] = useState(false);
  const [receiptContent, setReceiptContent] = useState('');

  const handlePayment = () => {
    const upiId = '8668722207@axl';
    if (paymentMethod === 'PhonePe' || paymentMethod === 'GPay' || paymentMethod === 'Paytm') {
      // For demo purposes, redirect to a placeholder URL
      window.location.href = `upi://pay?pa=${upiId}&pn=${userDetails.name}&am=${amount}&cu=INR`;
      
      // Simulate payment success (for demo purposes)
      setTimeout(() => {
        setReceiptContent(`Order placed successfully! Amount: ₹${amount.toFixed(2)}`);
        setReceiptVisible(true);
      }, 2000); // Simulate a delay for payment success
    } else {
      setReceiptContent('Order placed successfully! An online receipt is below.');
      setReceiptVisible(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const validateForm = () => {
    return userDetails.name && userDetails.phoneNumber && paymentMethod;
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-11/12 max-w-lg p-6 rounded-lg shadow-lg relative">
        <h3 className="text-2xl font-bold mb-4">Checkout</h3>
        <div className="flex flex-col space-y-4 mb-4">
          <label className="flex flex-col">
            <span>Name:</span>
            <input
              type="text"
              name="name"
              value={userDetails.name}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded"
            />
          </label>
          <label className="flex flex-col">
            <span>Phone Number:</span>
            <input
              type="text"
              name="phoneNumber"
              value={userDetails.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 p-2 border rounded"
            />
          </label>
        </div>
        <h3 className="text-xl font-bold mb-4">Select Payment Method</h3>
        <div className="flex flex-col space-y-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="PhonePe"
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            <img
              src="https://th.bing.com/th?id=OIP.BQV-JSgd4TkKLTsvKkVO0wHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
              alt="PhonePe"
              className="w-6 h-6 mr-2"
            /> PhonePe
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="GPay"
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            <img
              src="https://img.icons8.com/?size=48&id=d3FdjviJ7gNe&format=png"
              alt="GPay"
              className="w-6 h-6 mr-2"
            /> GPay
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="Paytm"
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            <img
              src="https://th.bing.com/th?id=OIP.ZOQdSCqP7m6diAOSC_FjJwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
              alt="Paytm"
              className="w-6 h-6 mr-2"
            /> Paytm
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="Cash"
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/128/639/639365.png"
              alt="Cash"
              className="w-6 h-6 mr-2"
            /> Cash
          </label>
        </div>
        <button
          onClick={handlePayment}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded mr-4"
          disabled={!validateForm()}
        >
          Proceed
        </button>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Cancel
        </button>
        {receiptVisible && (
          <div className="mt-4 p-4 bg-gray-100 rounded border border-gray-300">
            <h4 className="text-lg font-semibold">Receipt</h4>
            <p>{receiptContent}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentOptions;
