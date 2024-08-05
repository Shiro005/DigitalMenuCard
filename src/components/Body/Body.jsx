import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import foodItemsData from '../../data/foodItems.json'; // Ensure correct path
import { useCart } from '../context/CartContext'; // Ensure you have a CartContext

const Body = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [addedItemId, setAddedItemId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useCart(); // Access cart context

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredItems = foodItemsData.filter(item => {
    if (filter === 'under100') {
      return item.price < 100;
    }
    if (filter === 'dosa') {
      return item.category.toLowerCase() === 'dosa';
    }
    if (filter === 'pizza') {
      return item.category.toLowerCase() === 'pizza';
    }
    return true;
  });

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedItemId(item.id);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 1000);
  };

  return (
    <div className="relative flex items-center justify-center p-5 my-3">
      <div className="text-center text-gray-900 space-y-6 p-6">
        <motion.h1
          className="text-4xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to NightHub <span className='text-blue-500'>CAFE</span>
        </motion.h1>

        <motion.p
          className="text-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Your favorite meals delivered fast at your Digital India
        </motion.p>

        <motion.button
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-400 transition duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          onClick={() => setIsMenuOpen(true)}
        >
          Explore Menu
        </motion.button>
      </div>

      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => setIsMenuOpen(false)}
        >
          <motion.div
            className="bg-white w-3/4 max-w-md h-full shadow-lg p-6 overflow-y-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Menu</h2>
              <button className="text-gray-500 hover:text-gray-800" onClick={() => setIsMenuOpen(false)}>
                ✖
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Filter by:</label>
              <select
                className="w-full p-2 border rounded"
                value={filter}
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="under100">Under ₹100</option>
                <option value="dosa">Dosa</option>
                <option value="pizza">Pizza</option>
              </select>
            </div>

            <ul>
              {filteredItems.map(item => (
                <li key={item.id} className="flex items-center justify-between space-x-4 mb-4">
                  <div className="flex items-center space-x-4">
                    {/* <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" /> */}
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-600">Price: ₹{item.price}</p>
                    </div>
                  </div>
                  <button
                    className={`text-blue-500 hover:text-blue-700 ${addedItemId === item.id ? 'text-red-500' : ''}`}
                    onClick={() => handleAddToCart(item)}
                  >
                    <FaPlus />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}

      {showPopup && (
        <motion.div
          className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
        >
          Item added to cart!
        </motion.div>
      )}
    </div>
  );
};

export default Body;
