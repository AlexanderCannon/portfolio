'use client';
import React from 'react';
import Link from 'next/link';
import { X, ChevronRight } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: Array<{
    title: string;
    path: string;
  }>;
  title: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  menuItems,
  title,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose} />
      
      {/* Menu Panel */}
      <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-primary">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-gray-500 group-hover:text-primary transition-colors duration-200" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-2">
          {menuItems.map((item, index) => (
            <Link 
              key={item.path} 
              href={item.path}
              className="group"
            >
              <div 
                className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-all duration-200 group-hover:shadow-md"
                style={{
                  transitionDelay: `${index * 50}ms`
                }}
              >
                <span className="text-xl font-medium text-gray-700 group-hover:text-primary transition-colors duration-200">
                  {item.title}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
              </div>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-white">
          <a
            href="/contact"
            className="block w-full py-3 px-4 text-center text-white bg-primary rounded-lg hover:bg-opacity-90 transition-colors duration-200"
            onClick={onClose}
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;