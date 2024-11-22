import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Payment = ({ amount, onSuccess }) => {
  const handleToken = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/charge', {
        method: 'POST',
        body: JSON.stringify({ token, amount }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        onSuccess();  // Trigger successful payment flow
      } else {
        alert('Payment failed.');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment error. Please try again.');
    }
  };

  return (
    <div className="payment-container">
      <h4>Pay for the Full Report</h4>
      <StripeCheckout
        stripeKey="your-public-stripe-key"  // Use your Stripe public key
        token={handleToken}
        amount={amount * 100}  // Stripe requires amount in cents
        name="Property Curb Appeal Report"
        description="Full report for curb appeal evaluation"
        currency="USD"
      />
    </div>
  );
};

export default Payment;
