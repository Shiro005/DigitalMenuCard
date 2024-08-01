import React from 'react';
import { motion } from 'framer-motion';
import ExploreMenu from './ExploreMenu';

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
          Welcome to NightHub <span className='text-blue-400'>CAFE</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Your favorite meals delivered fast at you Digital India
        </motion.p>
        
        <motion.div 
          className="space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
            <ExploreMenu />
        </motion.div>
      </div>
    </div>
  );
};

export default Body;
