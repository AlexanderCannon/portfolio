'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  X,
  ChevronRight,
  Home,
  User,
  Newspaper,
  Phone,
  Briefcase,
  ExternalLink,
  Apple,
  Moon,
  Sun,
} from 'lucide-react';
import Button from './button';
import { socialLinks } from '~/app/_components/ui/header-sticky';
import { withTheme } from '~/app/_components/withTheme';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: Array<{
    title: string;
    path: string;
  }>;
  title: string;
  isDark: boolean;
  toggleDarkMode: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  menuItems,
  title,
  isDark,
  toggleDarkMode,
}) => {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  // Handle route changes
  useEffect(() => {
    if (isOpen) {
      handleClose();
    }
  }, [pathname]); // Listen for pathname changes

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
      case 'services': return Apple;
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
        className={`absolute inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-500 ease-out
        ${isClosing ? 'translate-x-full' : 'translate-x-0'}`}
      >
        {/* Header with animated gradient border */}
        <div className="relative p-6 border-b border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient" />
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-primary dark:text-blue-400 animate-fadeIn">{title}</h2>
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group hover:rotate-90"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors duration-200" />
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
                    background: hoveredIndex === index
                      ? isDark ? 'linear-gradient(to right, #1f2937, #111827)' : 'linear-gradient(to right, #f3f4f6, white)'
                      : 'transparent',
                    transitionDelay: `${index * 50}ms`
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 transition-colors duration-200
                    ${hoveredIndex === index
                        ? 'text-blue-400'
                        : 'text-gray-400 dark:text-gray-800'}`}
                    />
                    <span className={`text-xl font-medium transition-colors duration-200
                    ${hoveredIndex === index
                        ? 'text-blue-400'
                        : 'text-gray-700 dark:text-gray-300'}`}>
                      {item.title}
                    </span>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 transition-all duration-200
                    ${hoveredIndex === index
                        ? 'text-primary dark:text-blue-400 translate-x-1'
                        : 'text-gray-400 dark:text-gray-500'}`}
                  />
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Social Links */}
        <div className="absolute bottom-24 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex justify-center items-center space-x-6">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-110"
                  aria-label={social.label}
                >
                  <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors duration-200" />
                </a>
              );
            })}
            {/* Add vertical separator */}
            <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors duration-200" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors duration-200" />
              )}
            </button>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="w-full absolute bottom-0 left-0 right-0 p-6 border-t bg-white dark:bg-gray-900">
          <Button
            className='w-full'
            link="/contact"
            onClick={handleClose}
          >
            Get in Touch
          </Button>
        </div>
      </div>
    </div>
  );
};

export default withTheme(MobileMenu)