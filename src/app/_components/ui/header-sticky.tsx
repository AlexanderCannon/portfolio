'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Sun, Moon, Github, Linkedin, Twitter } from 'lucide-react';
import MobileMenu from '~/app/_components/ui/mobile-menu';
import Button from "~/app/_components/ui/button";

const menuItems = [
  { title: 'About', path: '/about' },
  { title: 'Projects', path: '/projects' },
  { title: 'Blog', path: '/blog' },
  { title: 'Contact', path: '/contact' },
  { title: 'Experience', path: '/experience' }
];

export const socialLinks = [
  { icon: Github, href: 'https://github.com/AlexanderCannon', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/alexandermcannon', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://x.com/alexmcan', label: 'Twitter' }
];

const HeaderSticky = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Initialize dark mode from localStorage
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };

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

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300
        ${scrolled
            ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg'
            : 'bg-white dark:bg-gray-900'}`}
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
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Alexander Cannon
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-purple-600 dark:from-blue-400 dark:to-purple-400 transition-all group-hover:w-full"></span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {/* Main Menu */}
              <div className="flex items-center space-x-6">
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="relative py-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-blue-400 transition-colors duration-200 group"
                  >
                    <span>{item.title}</span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary dark:bg-blue-400 transform scale-x-0 transition-transform duration-200 group-hover:scale-x-100"></span>
                  </Link>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex items-center space-x-4 border-l border-gray-200 dark:border-gray-700 pl-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors duration-200" />
                    </a>
                  );
                })}
              </div>

              {/* Theme Toggle */}
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

              {/* CTA Button */}
              <Button link="/contact">
                Get in touch
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors duration-200" />
            </button>
          </div>
        </div>
      </header >
      <MobileMenu
        toggleDarkMode={toggleDarkMode}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        menuItems={menuItems}
        title="Alexander Cannon"
        isDark={isDark}
      />
    </>
  );
};

export default HeaderSticky;