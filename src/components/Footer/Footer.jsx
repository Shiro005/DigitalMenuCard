import React from 'react';
import { MailIcon } from '@heroicons/react/outline';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-xl font-bold">NightHub <span className='text-blue-400'>CAFE</span></h2>
            <p className="mt-2">The best place to enjoy your favorite meals.</p>
            <p className="mt-1">123 Main Street, Kaulkhed, Akola</p>
            <p className="mt-1">Phone: (123) 456-7890</p>
          </div>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition duration-300">
              <FaInstagram className="h-6 w-6" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition duration-300">
              <FaFacebook className="h-6 w-6" />
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400 transition duration-300">
              <FaWhatsapp className="h-6 w-6" />
            </a>
            <a href="mailto:info@nighthubcafe.com" className="text-white hover:text-gray-400 transition duration-300">
              <MailIcon className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p>&copy; {new Date().getFullYear()} NightHub Cafe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
