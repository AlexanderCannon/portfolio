"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sun, Moon, Monitor, Github, Linkedin, Twitter } from "lucide-react";
import MobileMenu from "~/app/_components/ui/mobile-menu";
import Button from "~/app/_components/ui/button";
import SubstackIcon from "~/app/_components/ui/substack-icon";
import { useTheme } from "~/app/_components/withTheme";

const menuItems = [
  { title: "Home", path: "/" },
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

export default function HeaderSticky() {
  const pathname = usePathname();
  const {
    state: { preference },
    toggleTheme,
  } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        className={`sticky top-0 z-50 brass-stitch transition-colors duration-200 ${
          scrolled
            ? "border-b border-line bg-paper/95 backdrop-blur-sm"
            : "border-b border-transparent bg-paper"
        }`}
      >
        <div className="mx-auto flex max-w-shell items-center justify-between px-5 py-4 sm:px-8">
          <Link
            href="/"
            className="engraved font-display text-lg tracking-tight text-ink sm:text-xl"
          >
            Alexander Cannon
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <div className="flex items-center gap-5">
              {menuItems.map((item) => {
                const active = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                      active
                        ? "text-accent underline decoration-accent underline-offset-4"
                        : "text-ink-muted hover:text-ink"
                    }`}
                  >
                    {item.title}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-3 border-l border-dashed border-line pl-5">
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
                onClick={toggleTheme}
                className="text-ink-muted transition-colors hover:text-ink"
                aria-label={`Theme: ${preference}. Cycle theme.`}
                type="button"
              >
                {preference === "system" ? (
                  <Monitor className="h-4 w-4" />
                ) : preference === "dark" ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
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
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        menuItems={menuItems}
        title="Alexander Cannon"
      />
    </>
  );
}
