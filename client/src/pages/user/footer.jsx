import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="footer bg-gray-800 text-white p-10">
      {/* Logo & Social Media Section */}
      <aside className="flex flex-col items-center mx-2 mb-8 sm:mb-0 sm:flex-row sm:justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="https://res.cloudinary.com/aw96/image/upload/v1724584697/fyt_bfgnpm.png"
            alt="FYT Logo"
            width="50"
            height="50"
          />
          <p className="text-lg font-bold">Fill Your Tummy</p>
        </div>
        
        {/* Social Media Icons */}
        <nav className="flex space-x-4 mt-4 sm:mt-0">
          <Link
            to={'#'}
            className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </svg>
          </Link>
          <Link
            to={'#'}
            className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
            </svg>
          </Link>
          <Link
            to={'#'}
            className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
            </svg>
          </Link>
        </nav>
      </aside>

      {/* Footer Navigation Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <nav>
          <h6 className="footer-title text-lg font-semibold mb-4">Services</h6>
          <Link className="link block mb-2 hover:text-yellow-400 transition-colors duration-300" to={'/user/food'}>
            Food Delivery
          </Link>
          <Link className="link block mb-2 hover:text-yellow-400 transition-colors duration-300" to={'/user/partnership'}>
            Restaurant Partnerships
          </Link>
          <Link className="link block mb-2 hover:text-yellow-400 transition-colors duration-300" to={'/user/bulk'}>
            Corporate Orders
          </Link>
          <Link className="link block hover:text-yellow-400 transition-colors duration-300" to={'/user/special'}>
            Special Offers
          </Link>
        </nav>

        <nav>
          <h6 className="footer-title text-lg font-semibold mb-4">Company</h6>
          <Link className="link block mb-2 hover:text-yellow-400 transition-colors duration-300" to={'/user/about'}>
            About FYT
          </Link>
          <Link className="link block mb-2 hover:text-yellow-400 transition-colors duration-300" to={'/user/contact-us'}>
            Contact Us
          </Link>
          <Link className="link block mb-2 hover:text-yellow-400 transition-colors duration-300" to={'/user/careers'}>
            Careers
          </Link>
          <Link className="link block hover:text-yellow-400 transition-colors duration-300" to={'/user/news'}>
            News & Press
          </Link>
        </nav>

        <nav>
          <h6 className="footer-title text-lg font-semibold mb-4">Legal</h6>
          <Link className="link block mb-2 hover:text-yellow-400 transition-colors duration-300" to={'/user/terms'}>
            Terms of Service
          </Link>
          <Link className="link block mb-2 hover:text-yellow-400 transition-colors duration-300" to={'/user/privacy'}>
            Privacy Policy
          </Link>
          <Link className="link block hover:text-yellow-400 transition-colors duration-300" to={'/user/refund'}>
            Refund Policy
          </Link>
        </nav>
      </div>

      {/* Copyright */}
      <div className="mt-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} FYT (Fill Your Tummy) - All rights reserved.
      </div>
    </footer>
  );
};
