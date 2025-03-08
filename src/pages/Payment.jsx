import React, { useState } from "react";
import "./Payment.css";

const Payment = ({ cart, restaurant }) => {
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    address: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails({ ...billingDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation and confirmation process here
    console.log("Payment submitted", billingDetails);
  };

  return (
    <div className="payment-container">
      <h1>Payment</h1>
      <h2>Order Summary</h2>
      <p>Restaurant: {restaurant && restaurant.name}</p>
      <ul>
        {cart &&
          cart.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} x ${item.price}
            </li>
          ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <h2>Billing Details</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={billingDetails.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={billingDetails.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={billingDetails.cardNumber}
          onChange={handleChange}
        />
        <input
          type="text"
          name="expiryDate"
          placeholder="Expiry Date"
          value={billingDetails.expiryDate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={billingDetails.cvv}
          onChange={handleChange}
        />
        <button type="submit">Confirm Payment</button>
      </form>
    </div>
  );
};

export default Payment;
