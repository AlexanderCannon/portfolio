import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Contact Information */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
          <p className="text-sm">
            1234 Ethos AI Ave, Suite 100<br />
            Cityville, State 12345
          </p>
          <p className="text-sm mt-2">Phone: (123) 456-7890</p>
          <p className="text-sm">Email: contact@ethosai.com</p>
        </div>
        
        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul>
            <li className="text-sm mb-2 hover:underline">
              <a href="/about">About</a>
            </li>
            <li className="text-sm mb-2 hover:underline">
              <a href="/services">Services</a>
            </li>
            <li className="text-sm mb-2 hover:underline">
              <a href="/contact">Contact</a>
            </li>
            <li className="text-sm mb-2 hover:underline">
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
          </ul>
        </div>
        
        {/* Social Media Icons */}
        <div className="text-center md:text-left">
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF className="text-white text-xl hover:text-accent transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter className="text-white text-xl hover:text-accent transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedinIn className="text-white text-xl hover:text-accent transition" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="text-white text-xl hover:text-accent transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="text-center mt-8 text-sm">
        © 2024 Ethos AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
