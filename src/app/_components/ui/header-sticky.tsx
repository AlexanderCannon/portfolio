"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sun, Moon, Github, Linkedin, Twitter } from "lucide-react";
import MobileMenu from "~/app/_components/ui/mobile-menu";
import Button from "~/app/_components/ui/button";
import SubstackIcon from "~/app/_components/ui/substack-icon";
import { withTheme } from "~/app/_components/withTheme";

const menuItems = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Projects", path: "/projects" },
  { title: "Blog", path: "/blog" },
  { title: "Contact", path: "/contact" },
  { title: "Experience", path: "/experience" },
];

export const socialLinks = [
  { icon: Github, href: "https://github.com/AlexanderCannon", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/alexandermcannon",
    label: "LinkedIn",
  },
  { icon: Twitter, href: "https://x.com/alexmcan", label: "Twitter" },
  {
    icon: SubstackIcon,
    href: "https://alexandercannon.substack.com/",
    label: "Substack",
  },
];

const HeaderSticky = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          scrolled
            ? "border-line bg-paper/90 backdrop-blur-md"
            : "border-transparent bg-paper"
        }`}
      >
        <div className="mx-auto flex max-w-shell items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/"
            className="font-display text-xl tracking-tight text-ink transition-colors hover:text-accent sm:text-2xl"
          >
            Alexander Cannon
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <div className="flex items-center gap-6">
              {menuItems.map((item) => {
                const active = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`relative py-1 text-sm transition-colors ${
                      active
                        ? "text-ink"
                        : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {item.title}
                    <span
                      className={`absolute inset-x-0 -bottom-0.5 h-px bg-accent transition-opacity ${
                        active ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-3 border-l border-line pl-5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-muted transition-colors hover:text-ink"
                    aria-label={social.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
              <button
                onClick={toggleDarkMode}
                className="text-ink-muted transition-colors hover:text-ink"
                aria-label="Toggle theme"
                type="button"
              >
                {isDark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </button>
            </div>

            <Button link="/contact" variant="ghost">
              Get in touch
            </Button>
          </nav>

          <button
            className="text-ink md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            type="button"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>
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

export default withTheme(HeaderSticky);
