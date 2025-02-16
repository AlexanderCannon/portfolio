'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import {
  X,
  ChevronRight,
  Home,
  User,
  Newspaper,
  Phone,
  Briefcase,
  ExternalLink,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' }
];

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 500);
  };

  if (!isOpen) return null;

  // Map icons to menu items
  const getIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'home': return Home;
      case 'about': return User;
      case 'blog': return Newspaper;
      case 'contact': return Phone;
      case 'experience': return Briefcase;
      default: return ExternalLink;
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop with blur */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-500 backdrop-blur-sm
          ${isClosing ? 'opacity-0' : 'opacity-50'}`}
        onClick={handleClose}
      />

      {/* Menu Panel */}
      <div
        className={`absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-500 ease-out
          ${isClosing ? 'translate-x-full' : 'translate-x-0'}`}
      >
        {/* Header with animated gradient border */}
        <div className="relative p-6 border-b overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient" />
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-primary animate-fadeIn">{title}</h2>
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-all duration-200 group hover:rotate-90"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-gray-500 group-hover:text-primary transition-colors duration-200" />
            </button>
          </div>
        </div>

        {/* Navigation with enhanced animations */}
        <nav className="p-6 space-y-2">
          {menuItems.map((item, index) => {
            const Icon = getIcon(item.title);
            return (
              <Link
                key={item.path}
                href={item.path}
                className="group block"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className="flex items-center justify-between p-4 rounded-lg transition-all duration-300 ease-out"
                  style={{
                    transform: `translateX(${hoveredIndex === index ? '8px' : '0'})`,
                    background: hoveredIndex === index ? 'linear-gradient(to right, #f3f4f6, white)' : 'white',
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 transition-colors duration-200
                      ${hoveredIndex === index ? 'text-primary' : 'text-gray-400'}`}
                    />
                    <span className={`text-xl font-medium transition-colors duration-200
                      ${hoveredIndex === index ? 'text-primary' : 'text-gray-700'}`}>
                      {item.title}
                    </span>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 transition-all duration-200
                      ${hoveredIndex === index ? 'text-primary translate-x-1' : 'text-gray-400'}`}
                  />
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Social Links */}
        <div className="absolute bottom-24 left-0 right-0 p-6 border-t bg-white">
          <div className="flex justify-center space-x-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-3 rounded-full hover:bg-gray-100 transition-transform duration-200 hover:scale-110"
                  aria-label={social.label}
                >
                  <Icon className="w-6 h-6 text-gray-600 hover:text-primary transition-colors duration-200" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t bg-white">
          <a
            href="/contact"
            className="group block w-full py-3 px-4 text-center text-white bg-primary rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-[1.02] relative overflow-hidden"
            onClick={handleClose}
          >
            <span className="relative z-10">Get in Touch</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
};

// Add these custom animations to your global CSS
const styles = `
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease-out forwards;
}
`;

export default MobileMenu;