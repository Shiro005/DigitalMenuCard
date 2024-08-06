import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

const AdminPanel = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newItem, setNewItem] = useState({ id: '', name: '', price: '', rating: '', image: '', category: '' });
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchFoodItems();
    fetchOrders();
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
      const response = await axios.get('http://localhost:5000/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleAddItem = async () => {
    try {
      await axios.post('http://localhost:5000/foodItems', newItem);
      setNewItem({ id: '', name: '', price: '', rating: '', image: '', category: '' });
      fetchFoodItems();
    } catch (error) {
      console.error('Error adding food item:', error);
    }
  };

  const handleUpdateItem = async () => {
    try {
      await axios.put(`http://localhost:5000/foodItems/${editItem.id}`, editItem);
      setEditItem(null);
      fetchFoodItems();
    } catch (error) {
      console.error('Error updating food item:', error);
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

  const handleOrderDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/orders/${id}`);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  // Group food items by category
  const groupedFoodItems = foodItems.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>

        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Add / Edit Food Item</h3>
          <input
            type="text"
            placeholder="ID"
            value={editItem ? editItem.id : newItem.id}
            onChange={(e) => (editItem ? setEditItem({ ...editItem, id: e.target.value }) : setNewItem({ ...newItem, id: e.target.value }))}
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            placeholder="Name"
            value={editItem ? editItem.name : newItem.name}
            onChange={(e) => (editItem ? setEditItem({ ...editItem, name: e.target.value }) : setNewItem({ ...newItem, name: e.target.value }))}
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            placeholder="Price"
            value={editItem ? editItem.price : newItem.price}
            onChange={(e) => (editItem ? setEditItem({ ...editItem, price: e.target.value }) : setNewItem({ ...newItem, price: e.target.value }))}
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            placeholder="Rating"
            value={editItem ? editItem.rating : newItem.rating}
            onChange={(e) => (editItem ? setEditItem({ ...editItem, rating: e.target.value }) : setNewItem({ ...newItem, rating: e.target.value }))}
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={editItem ? editItem.image : newItem.image}
            onChange={(e) => (editItem ? setEditItem({ ...editItem, image: e.target.value }) : setNewItem({ ...newItem, image: e.target.value }))}
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <input
            type="text"
            placeholder="Category"
            value={editItem ? editItem.category : newItem.category}
            onChange={(e) => (editItem ? setEditItem({ ...editItem, category: e.target.value }) : setNewItem({ ...newItem, category: e.target.value }))}
            className="mb-2 p-2 border border-gray-300 rounded w-full"
          />
          <button
            onClick={editItem ? handleUpdateItem : handleAddItem}
            className="bg-green-500 text-white p-2 rounded w-full"
          >
            {editItem ? 'Update Item' : 'Add Item'}
          </button>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Food Items</h3>
          {Object.keys(groupedFoodItems).map((category) => (
            <div key={category} className="mb-6">
              <h4 className="text-lg font-bold mb-2">{category}</h4>
              <ul>
                {groupedFoodItems[category].map(item => (
                  <li key={item.id} className="flex justify-between items-center mb-2">
                    <div>
                      {item.name} - ₹{item.price} - {item.rating} stars
                    </div>
                    <div className='flex mx-2'>
                      <button
                        onClick={() => { setEditItem(item); }}
                        className="bg-blue-500 text-white p-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="bg-red-500 text-white p-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Orders</h3>
          <ul>
            {orders.map(order => (
              <li key={order.id} className="mb-4 p-4 border border-gray-300 rounded">
                <div>
                  <strong>Name:</strong> {order.name}<br />
                  <strong>Phone:</strong> {order.phone}<br />
                  <strong>Order Details:</strong> {order.details.map(detail => (
                    <div key={detail.id}>
                      <strong>{detail.name}</strong> - Quantity: {detail.quantity}<br />
                    </div>
                  ))}<br />
                  <strong>Payment Mode:</strong> {order.payment}<br />
                  <strong>Order Time:</strong> {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                </div>
                <button
                  onClick={() => handleOrderDelete(order.id)}
                  className="bg-red-500 text-white p-1 rounded mt-2"
                >
                  Delete Order
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
