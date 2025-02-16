'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Sun, Moon, Github, Linkedin, Twitter } from 'lucide-react';
import MobileMenu from '~/app/_components/ui/mobile-menu';

const menuItems = [
  { title: 'About', path: '/about' },
  { title: 'Projects', path: '/projects' },
  { title: 'Blog', path: '/blog' },
  { title: 'Contact', path: '/contact' },
  { title: 'Experience', path: '/experience' }
];

const socialLinks = [
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' }
];

const HeaderSticky = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle resize for mobile menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-white/80 backdrop-blur-lg shadow-lg'
          : 'bg-white'}`}
    >
      {/* Animated gradient line */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient" />

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo Section */}
          <Link
            href="/"
            className="relative group"
          >
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              Alexander Cannon
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 transition-all group-hover:w-full"></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Main Menu */}
            <div className="flex items-center space-x-6">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="relative py-2 text-gray-700 hover:text-primary transition-colors duration-200 group"
                >
                  <span>{item.title}</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 border-l pl-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5 text-gray-600 group-hover:text-primary transition-colors duration-200" />
                  </a>
                );
              })}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-gray-600 hover:text-primary transition-colors duration-200" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 hover:text-primary transition-colors duration-200" />
              )}
            </button>

            {/* CTA Button */}
            <a
              href="/contact"
              className="group relative inline-flex items-center justify-center px-6 py-2 font-medium text-white transition-all duration-200 ease-in-out"
            >
              <span className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-r from-primary to-purple-600 group-hover:translate-x-1 group-hover:translate-y-1"></span>
              <span className="absolute inset-0 w-full h-full rounded-lg bg-gradient-to-r from-primary to-purple-600 group-hover:bg-opacity-0"></span>
              <span className="relative">Get in touch</span>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 group"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors duration-200" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={toggleMenu}
        menuItems={menuItems}
        title="Alexander Cannon"
      />
    </header>
  );
};

// Add this keyframe to your global CSS
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
`;

export default HeaderSticky;