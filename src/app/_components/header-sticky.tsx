'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const HeaderSticky: React.FC = () => {
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
          <Link href="/about" className="text-gray-700 hover:text-primary">
            About
          </Link>
          <Link href="/blog" className="text-gray-700 hover:text-primary">
            Blog
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-primary">
            Contact
          </Link>
          <Link href="/experience" className="text-gray-700 hover:text-primary">
            Experience
          </Link>
          {/* <Link href="/blog" className="text-gray-700 hover:text-primary">
            Blog
          </Link> */}
        </nav>

        {/* CTA Button */}
        <a
          href="/contact"
          className="hidden md:inline-block bg-accent text-slate-800 py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Get in touch
        </a>

        {/* Mobile Menu Icon */}
        <button className="md:hidden text-primary" onClick={toggleMenu}>
          {/* Simple icon, replace with an actual icon like Hamburger */}
          <span className="material-icons">menu</span>
        </button>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`fixed inset-0 bg-white z-40 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300 ease-in-out`}
        >
          <div className="flex justify-end p-4">
            <button onClick={toggleMenu} className="text-primary">
              <span className="material-icons">close</span>
            </button>
          </div>
          <h1 className="text-4xl font-bold text-center text-primary">Alexander Cannon</h1>
          <nav className="flex flex-col items-center justify-center h-full space-y-16">
            <Link href="/about">
              <button className="text-primary text-6xl" onClick={toggleMenu}>About</button>
            </Link>
            <Link href="/contact">
              <button className="text-primary text-6xl" onClick={toggleMenu}>Contact</button>
            </Link>
            <Link href="/blog">
              <button className="text-primary text-6xl" onClick={toggleMenu}>Blog</button>
            </Link>
            <Link href="/experience">
              <button className="text-primary text-6xl" onClick={toggleMenu}>Experience</button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default HeaderSticky;
