import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import foodItemsData from '../../../db.json'; // Ensure correct path
import { useCart } from '../context/CartContext'; // Ensure you have a CartContext

const Body = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [addedItemId, setAddedItemId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showMainPopup, setShowMainPopup] = useState(false);
  const { addToCart } = useCart(); // Access cart context

  const foodItems = foodItemsData.foodItems || []; // Extract food items

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredItems = foodItems.filter((item) => {
    if (filter === 'under100') {
      return item.price < 100;
    }
    if (filter === 'Dosa') {
      return item.category.toLowerCase() === 'dosa';
    }
    if (filter === 'Pizza') {
      return item.category.toLowerCase() === 'pizza';
    }
    return true;
  });

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedItemId(item.id);
    setShowPopup(true);
    setShowMainPopup(true);

    setTimeout(() => {
      setShowPopup(false);
      setShowMainPopup(false);
    }, 1000);
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-5 my-3">
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

      {/* Main Screen Food Items */}
      <div className="w-full p-5">
        <div className="overflow-x-auto">
          <div className="flex space-x-4 p-4">
            <button onClick={() => setFilter('')} className="py-2 px-4 bg-gray-200 rounded-lg font-bold">All</button>
            <button onClick={() => setFilter('under100')} className="py-2 px-4 bg-gray-200 rounded-lg font-bold">Under ₹100</button>
            <button onClick={() => setFilter('dosa')} className="py-2 px-4 bg-gray-200 rounded-lg font-bold">Dosa</button>
            <button onClick={() => setFilter('pizza')} className="py-2 px-4 bg-gray-200 rounded-lg font-bold">Pizza</button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-gray-800 font-bold mb-4">Price: ₹{item.price}</p>
                <button
                  className={`flex items-center justify-center py-2 px-4 rounded-lg ${addedItemId === item.id ? 'bg-red-500' : 'bg-blue-500'} text-white hover:bg-blue-400 transition duration-300`}
                  onClick={() => handleAddToCart(item)}
                >
                  <FaPlus className="mr-2" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Explore Menu Section */}
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

            <ul>
              {filteredItems.map(item => (
                <li key={item.id} className="flex flex-col items-start bg-white shadow-md rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <p className="text-gray-800 font-bold mb-2">Price: ₹{item.price}</p>
                  <button
                    className="flex items-center py-2 px-4 rounded-lg bg-slate-900 text-white hover:bg-slate-700 transition duration-300"
                    onClick={() => {
                      handleAddToCart(item);
                      setShowPopup(true);
                    }}
                  >
                    <FaPlus className="mr-2" /> Add to Cart
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
          transition={{ duration: 2 }}
        >
          Item added to cart!
        </motion.div>
      )}

      {/* {showMainPopup && (
        <motion.div
          className="fixed bottom-4 left-4 bg-yellow-500 text-white px-4 py-2 rounded shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
        >
          Item added to cart from Explore Menu!
        </motion.div>
      )} */}
    </div>
  );
};

export default Body;
