import React, { useState } from 'react';

const PaymentOptions = ({ amount, userName, onSuccess, onClose }) => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [receiptVisible, setReceiptVisible] = useState(false);
  const [receiptContent, setReceiptContent] = useState('');

  const handlePayment = () => {
    const upiId = '8668722207@axl';
    if (paymentMethod === 'PhonePe' || paymentMethod === 'GPay' || paymentMethod === 'Paytm') {
      window.location.href = `upi://pay?pa=${upiId}&pn=${userName}&am=${amount}&cu=INR`;
      
      setTimeout(() => {
        setReceiptContent(`Order placed successfully! Amount: ₹${amount.toFixed(2)}`);
        setReceiptVisible(true);
        onSuccess();  // Notify the parent component of payment success
      }, 2000);
    } else {
      setReceiptContent('Order placed successfully! An online receipt is below.');
      setReceiptVisible(true);
      onSuccess();  // Notify the parent component of payment success
    }
  };

  const validateForm = () => {
    return paymentMethod;
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-11/12 max-w-lg p-6 rounded-lg shadow-lg relative">
        <h3 className="text-2xl font-bold mb-4">Checkout</h3>
        <h3 className="text-xl font-bold mb-4">Choose Payment Method</h3>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="p-2 border rounded-lg w-full mb-4"
        >
          <option value="">Select payment method</option>
          <option value="PhonePe">PhonePe</option>
          <option value="GPay">GPay</option>
          <option value="Paytm">Paytm</option>
          <option value="COD">Cash on Delivery</option>
        </select>
        <button
          onClick={handlePayment}
          className={`px-6 py-3 mt-4 w-full text-white rounded-lg ${validateForm() ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!validateForm()}
        >
          Proceed to Pay
        </button>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full"
        >
          Cancel
        </button>
        {receiptVisible && (
          <div className="mt-6 bg-green-100 p-4 rounded-lg text-green-700">
            {receiptContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentOptions;
