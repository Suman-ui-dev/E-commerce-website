import React, { useContext } from 'react';
import { useCart } from './CartContext'; // Import useCart

const AdminDashboard = () => {
  const { state } = useCart(); // Get orders from CartProvider

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">User ID</th>
            <th className="p-2 border">Items</th>
            <th className="p-2 border">Total Price</th>
            <th className="p-2 border">Address</th>
            <th className="p-2 border">Payment Method</th>
          </tr>
        </thead>
        <tbody>
          {state.orders.map((order, index) => (
            <tr key={index} className="border">
              <td className="p-2 border">{index + 1}</td> {/* Use index as order ID for now */}
              <td className="p-2 border">{order.userId}</td>
              <td className="p-2 border">
                {order.items.map((item) => (
                  <div key={item._id}>{item.name}</div>
                ))}
              </td>
              <td className="p-2 border">${order.totalPrice}</td>
              <td className="p-2 border">{order.address}</td>
              <td className="p-2 border">{order.paymentMethod}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;