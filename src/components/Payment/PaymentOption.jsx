import React, { useState } from 'react';

const PaymentOptions = ({ amount, userName, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePayment = () => {
    if (paymentMethod === 'PhonePe' || paymentMethod === 'GPay' || paymentMethod === 'Paytm') {
      // Logic to redirect to the payment app with the specified amount
      window.location.href = `payment-app://pay?amount=${amount}&username=${userName}`;
    } else {
      alert('Order placed successfully! An online receipt will be sent to your email.');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-11/12 max-w-lg p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-4">Select Payment Method</h3>
        <div className="flex flex-col space-y-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="PhonePe"
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            PhonePe
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="GPay"
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            GPay
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="Paytm"
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Paytm
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="Cash"
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-2"
            />
            Cash
          </label>
        </div>
        <button
          onClick={handlePayment}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          disabled={!paymentMethod}
        >
          Proceed
        </button>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentOptions;
