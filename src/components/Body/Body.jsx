import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import foodItemsData from '../../../db.json'; // Ensure correct path
import { useCart } from '../context/CartContext'; // Ensure you have a CartContext

const Body = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const [addedItemId, setAddedItemId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showMainPopup, setShowMainPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const { addToCart } = useCart(); // Access cart context

  const foodItems = foodItemsData.foodItems || []; // Extract food items
  const categories = [...new Set(foodItems.map(item => item.category))]; // Get unique categories

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOfferIndex(prevIndex => (prevIndex + 1) % offerCards.length);
    }, 3000); // Change offer card every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const offerCards = [
    { title: 'Limited Time Offers!', description: 'Get up to 30% OFF on your favorite meals', bg: 'bg-gradient-to-r from-purple-500 to-indigo-500' },
    { title: 'Weekend Specials!', description: 'Enjoy 20% OFF on orders above ₹500', bg: 'bg-gradient-to-r from-green-400 to-blue-500' },
    { title: 'Family Meals', description: 'Get a 15% discount on family combos', bg: 'bg-gradient-to-r from-pink-500 to-red-500' },
    { title: 'Happy Hours!', description: 'Buy 1 Get 1 Free on select items', bg: 'bg-gradient-to-r from-yellow-500 to-orange-500' },
  ];

  const handleFilterChange = (category) => {
    setFilter(category);
  };

  const filteredItems = foodItems.filter((item) => {
    if (filter === 'under100') {
      return item.price < 100;
    }
    if (item.category && filter.toLowerCase() === item.category.toLowerCase()) {
      return true;
    }
    return filter === '';
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
    <div className="relative flex flex-col items-center justify-center p-3 my-3 bg-gray-50">
      {/* Offers Banner */}
      <div className="w-full overflow-x-hidden p-5 mb-6 relative h-40">
        <AnimatePresence>
          {offerCards.map((offer, index) => (
            index === currentOfferIndex && (
              <motion.div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center text-white p-4 rounded-lg shadow-lg ${offer.bg} transition-all duration-1000`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <motion.h2
                  className="text-3xl font-bold mb-2"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  {offer.title}
                </motion.h2>
                <motion.p
                  className="text-lg"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  {offer.description}
                </motion.p>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Categories Scroll */}
      <div className="w-full max-w-6xl overflow-x-auto whitespace-nowrap mb-6">
        <div className="flex space-x-4 px-2 py-2">
          {categories.map((category, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 transform hover:scale-110 ${filter === category ? 'bg-gray-800 text-white shadow-lg' : 'bg-gray-200 text-gray-800'} hover:bg-gray-800 hover:text-white`}
              onClick={() => handleFilterChange(category)}
              whileHover={{ scale: 1.1 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-gray-400 to-gray-800 mt-2 rounded-lg"></div>
      </div>

      {/* Best Quality Picks */}
      <motion.div
        className="w-full max-w-6xl p-5 mb-12 bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Top Quality Picks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems
            .filter(item => item.rating >= 4.5)
            .map(item => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-lg font-bold text-slate-800 mb-2">₹{item.price}</p>
                <p className="text-sm text-gray-600 mb-4">Rating: ⭐{item.rating}</p>
                <button
                  className={`flex items-center justify-center py-2 px-4 rounded-lg ${addedItemId === item.id ? 'bg-green-600' : 'bg-yellow-500'} text-white hover:bg-yellow-500 transition-colors duration-300 font-bold shadow-lg`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(item);
                  }}
                >
                  <FaPlus className="mr-2" /> Add to Cart
                </button>
              </div>
            ))}
        </div>
      </motion.div>

      {/* Explore Menu Section */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-900 bg-opacity-60 z-50 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => setIsMenuOpen(false)}
        >
          <motion.div
            className="bg-white w-full md:w-3/4 lg:w-1/2 h-full max-w-lg shadow-lg p-6 overflow-y-auto"
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
                    className="flex items-center py-2 px-4 rounded-lg bg-green-600 text-white hover:bg-green-500 transition-colors duration-300"
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

      {/* Item Details Popup */}
      {selectedItem && (
        <motion.div
          className="fixed inset-0 bg-gray-900 bg-opacity-60 z-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-white w-full md:w-3/4 lg:w-1/2 max-w-lg p-6 rounded-lg shadow-lg overflow-y-auto"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h2 className="text-2xl font-bold mb-4">{selectedItem.name}</h2>
            <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-64 object-cover mb-4 rounded-lg" />
            <p className="text-lg mb-4">{selectedItem.description}</p>
            <p className="text-2xl font-bold text-red-600 mb-6">₹{selectedItem.price}</p>
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded-lg transition-colors duration-300"
              onClick={() => {
                handleAddToCart(selectedItem);
                setSelectedItem(null);
              }}
            >
              Add to Cart
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Notification Popup */}
      {showPopup && (
        <motion.div
          className="fixed top-0 right-0 p-4 bg-green-500 text-white rounded-lg shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          Item added to cart!
        </motion.div>
      )}
    </div>
  );
};

export default Body;
