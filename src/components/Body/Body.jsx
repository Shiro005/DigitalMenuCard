import React from 'react';
import { motion } from 'framer-motion';

const Body = () => {
  return (
    <div className="flex items-center justify-center p-5 my-3">
      <div className="text-center text-gray-900 space-y-6 p-6">
        <motion.h1 
          className="text-3xl font-bold"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to NightHub Cafe
        </motion.h1>
        
        <motion.p 
          className="text-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Your favorite meals delivered fast at your door.
        </motion.p>
        
        <motion.div 
          className="space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <button className="bg-white text-gray-900 px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
            Order Now
          </button>
          <button className="bg-white text-red-500 px-4 py-2 rounded-full shadow-lg hover:bg-gray-100 transition duration-300">
            Explore Menu
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Body;
