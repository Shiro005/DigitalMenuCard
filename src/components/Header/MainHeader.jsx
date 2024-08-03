import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaHamburger } from 'react-icons/fa';
import { useCart } from '../context/CartContext'; 
import LocationOn from '@mui/icons-material/LocationOn';

const MainHeader = () => {
    const { cartItems } = useCart(); 

    return (
        <>
            <header className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-lg">
                <div className="flex items-center space-x-4">
                    <div className='bg-opacity-35 p-2 rounded-md flex items-center'>
                        <div className='animate-location-icon'>
                            <LocationOn className='h-8 w-8' />
                        </div>
                        <div className='ml-2 font-bold text-white'>
                            <h2 className='text-xl'>NightHub <span className='text-blue-400'>CAFE</span></h2>
                            <h2 className='text-slate-200'>Kaulkhed, Akola</h2>
                            <h3 className='text-sm text-gray-400'>Powered by WebReich Community</h3>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-6">
                    <Link
                        to="/"
                        className="text-2xl hover:text-gray-400 transition-colors duration-200"
                    >
                        <FaHamburger />
                    </Link>
                    <Link
                        to="/cart"
                        className="relative flex items-center hover:text-gray-400 transition-colors duration-200"
                    >
                        <FaShoppingCart />
                        {cartItems.length > 0 && (
                            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white w-3 h-3 rounded-full"></span>
                        )}
                    </Link>
                    <Link
                        to="/admin"
                        className="hover:text-gray-400 transition-colors duration-200"
                    >
                        <FaUser />
                    </Link>
                </div>
            </header>
            <style jsx>{`
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes jump {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes colorChange {
          0% { color: red; }
          14% { color: orange; }
          28% { color: yellow; }
          42% { color: green; }
          56% { color: blue; }
          70% { color: indigo; }
          84% { color: violet; }
          100% { color: red; }
        }
        .animate-location-icon {
          animation: rotate 1s linear infinite, jump 1s ease-in-out infinite, colorChange 7s linear infinite;
        }
      `}</style>
        </>
    );
};

export default MainHeader;
