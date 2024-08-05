import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [orders, setOrders] = useState([]); // Add state for orders
  const [newItem, setNewItem] = useState({ id: '', name: '', price: '', rating: '', image: '' });

  useEffect(() => {
    fetchFoodItems();
    fetchOrders(); // Fetch orders when component mounts
  }, []);

  const fetchFoodItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/foodItems');
      setFoodItems(response.data);
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/orders'); // Adjust URL if needed
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleAddItem = async () => {
    try {
      await axios.post('http://localhost:5000/foodItems', newItem);
      setNewItem({ id: '', name: '', price: '', rating: '', image: '' });
      fetchFoodItems();
    } catch (error) {
      console.error('Error adding food item:', error);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/foodItems/${id}`);
      fetchFoodItems();
    } catch (error) {
      console.error('Error deleting food item:', error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
        <div className="mb-4">
          <input 
            type="text" 
            placeholder="ID" 
            value={newItem.id} 
            onChange={(e) => setNewItem({ ...newItem, id: e.target.value })} 
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <input 
            type="text" 
            placeholder="Name" 
            value={newItem.name} 
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} 
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <input 
            type="text" 
            placeholder="Price" 
            value={newItem.price} 
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} 
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <input 
            type="text" 
            placeholder="Rating" 
            value={newItem.rating} 
            onChange={(e) => setNewItem({ ...newItem, rating: e.target.value })} 
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <input 
            type="text" 
            placeholder="Image URL" 
            value={newItem.image} 
            onChange={(e) => setNewItem({ ...newItem, image: e.target.value })} 
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <button 
            onClick={handleAddItem} 
            className="bg-green-500 text-white p-2 rounded w-full"
          >
            Add Item
          </button>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Food Items</h3>
          <ul>
            {foodItems.map(item => (
              <li key={item.id} className="flex justify-between items-center mb-2">
                <div>
                  {item.name} - ₹{item.price} - {item.rating} stars
                </div>
                <button 
                  onClick={() => handleDeleteItem(item.id)} 
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Orders</h3>
          <ul>
            {orders.map(order => (
              <li key={order.id} className="mb-2">
                <div>
                  <strong>Name:</strong> {order.name}<br />
                  <strong>Phone:</strong> {order.phone}<br />
                  <strong>Order Details:</strong> {order.details}<br />
                  <strong>Payment Details:</strong> {order.payment}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
