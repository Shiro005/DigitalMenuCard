import React, { useState } from 'react';
import foodData from '../../data/foodItems.json';

const AdminPanel = ({ foodItems, setFoodItems }) => {
  const [newItem, setNewItem] = useState({ id: '', name: '', price: '', rating: '', image: '' });

  const handleAddItem = () => {
    setFoodItems([...foodItems, newItem]);
    setNewItem({ id: '', name: '', price: '', rating: '', image: '' });
  };

  const handleDeleteItem = (id) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <div>
        <input 
          type="text" 
          placeholder="ID" 
          value={newItem.id} 
          onChange={(e) => setNewItem({ ...newItem, id: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Name" 
          value={newItem.name} 
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Price" 
          value={newItem.price} 
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Rating" 
          value={newItem.rating} 
          onChange={(e) => setNewItem({ ...newItem, rating: e.target.value })} 
        />
        <input 
          type="text" 
          placeholder="Image URL" 
          value={newItem.image} 
          onChange={(e) => setNewItem({ ...newItem, image: e.target.value })} 
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
      <div>
        <h3>Food Items</h3>
        <ul>
          {foodItems.map(item => (
            <li key={item.id}>
              {item.name} - ${item.price} - {item.rating} stars
              <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
