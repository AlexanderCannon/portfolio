'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import MobileMenu from '~/app/_components/mobile-menu';

const menuItems = [
  { title: 'About', path: '/about' },
  { title: 'Blog', path: '/blog' },
  { title: 'Contact', path: '/contact' },
  { title: 'Experience', path: '/experience' },
  { title: 'Services', path: '/services' },
  { title: 'Projects', path: '/projects' },
];

const HeaderSticky = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          Alexander Cannon
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="text-gray-700 hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <a
          href="/contact"
          className="hidden md:inline-block bg-accent text-slate-800 py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Get in touch
        </a>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6 text-primary" />
        </button>
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={toggleMenu}
        menuItems={menuItems}
        title="Alexander Cannon"
      />
    </header>
  );
};

export default HeaderSticky;