import React from 'react';

export const AdminFooter = () => {
  return (
    <footer className="bg-neutral text-neutral-content p-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Company Info */}
        <aside className="flex flex-col items-center md:items-start space-y-4">

          <p className="text-center md:text-left">
            Fill Your Tummy
            <br />   
            Delivering Food  since 2024
          </p>
        </aside>

       

        {/* Additional Links or Information */}
        <div className="flex flex-col items-center md:items-start">
          <h6 className="footer-title text-lg mb-2">Quick Links</h6>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
          </ul>
        </div>

        <div className="flex flex-col items-center md:items-start">
          <h6 className="footer-title text-lg mb-2">Server Links</h6>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white">Report Bug</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Report Pishing</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Test Mode</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
