import React, { useState } from "react";
import axios from "axios";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext"; // Import useAuth

const OrderSummary = ({ cartItems, totalPrice, onPlaceOrder }) => {
  const { placeOrder } = useCart();
  const { currentUser } = useAuth(); // Access currentUser from AuthContext
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [error, setError] = useState(null);

  const addresses = [
    { id: 1, name: "Home", address: "123 Main St, City, Country" },
    { id: 2, name: "Office", address: "456 Business Rd, City, Country" },
  ];

  const paymentOptions = [
    { id: 1, name: "Credit Card" },
    { id: 2, name: "UPI" },
    { id: 3, name: "Net Banking" },
  ];

  const handlePlaceOrder = async () => {
    if (!cartItems || cartItems.length === 0) {
      console.error("No items in the cart.");
      setError("No items in the cart.");
      return;
    }

    if (!totalPrice || totalPrice <= 0) {
      console.error("Invalid total price.");
      setError("Invalid total price.");
      return;
    }

    if (!currentUser) {
      console.error("No user is currently logged in.");
      setError("No user is currently logged in.");
      return;
    }

    const orderData = {
      items: cartItems,
      totalAmount: totalPrice,
      userId: currentUser.id,
      // Other necessary fields...
    };

    console.log("Order payload:", orderData); // Debugging log

    try {
      const response = await axios.post("http://localhost:5000/place-order", orderData);
      console.log("Order placed successfully:", response.data);
      // Handle successful order placement (e.g., navigate to confirmation page)
    } catch (error) {
      console.error("Failed to place order:", error.response?.data || error.message); // Log the error response
      setError(error.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

      {/* Address Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Select Delivery Address</h3>
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`border p-4 mb-2 rounded-lg cursor-pointer ${
              selectedAddress === address.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
            }`}
            onClick={() => setSelectedAddress(address.id)}
          >
            <p className="font-semibold">{address.name}</p>
            <p className="text-gray-600">{address.address}</p>
          </div>
        ))}
        <button className="text-blue-500 mt-2">Add New Address</button>
      </div>

      {/* Payment Options */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
        {paymentOptions.map((payment) => (
          <div
            key={payment.id}
            className={`border p-4 mb-2 rounded-lg cursor-pointer ${
              selectedPayment === payment.id ? "border-blue-500 bg-blue-50" : "border-gray-200"
            }`}
            onClick={() => setSelectedPayment(payment.id)}
          >
            <p className="font-semibold">{payment.name}</p>
          </div>
        ))}
      </div>

      {/* Price Details */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Price Details</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-gray-600">Total Price</p>
            <p className="font-semibold">${totalPrice}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Discount</p>
            <p className="text-green-600">-$10.00</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Delivery Charges</p>
            <p className="text-gray-600">Free</p>
          </div>
          <div className="flex justify-between border-t pt-2">
            <p className="font-semibold">Total Amount</p>
            <p className="font-semibold">${totalPrice - 10}</p>
          </div>
        </div>
      </div>

      {/* Place Order Button */}
      <button
        className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
        onClick={handlePlaceOrder}
      >
        Place Order
      </button>

      {/* Display error message if any */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default OrderSummary;