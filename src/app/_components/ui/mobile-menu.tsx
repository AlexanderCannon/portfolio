"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Moon, Sun, Monitor } from "lucide-react";
import Button from "./button";
import { socialLinks } from "~/app/_components/ui/header-sticky";
import { useTheme } from "~/app/_components/withTheme";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: Array<{ title: string; path: string }>;
  title: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  menuItems,
  title,
}: MobileMenuProps) {
  const pathname = usePathname();
  const {
    state: { preference },
    toggleTheme,
  } = useTheme();
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) handleClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 280);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
      />

      <div
        className={`absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-ink bg-paper map-rule transition-transform duration-300 ease-out ${
          isClosing ? "translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-dashed border-line bg-paper px-5 py-4">
          <p className="engraved font-display text-lg tracking-tight text-ink">
            {title}
          </p>
          <button
            onClick={handleClose}
            aria-label="Close menu"
            type="button"
            className="text-ink-muted hover:text-ink"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 bg-paper/90 px-3 py-6">
          {menuItems.map((item) => {
            const active = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`rounded-sm px-3 py-3 font-mono text-sm uppercase tracking-[0.12em] transition-colors ${
                  active
                    ? "bg-accent-soft text-accent"
                    : "text-ink-muted hover:bg-secondary hover:text-ink"
                }`}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-dashed border-line bg-paper px-5 py-5">
          <div className="mb-5 flex items-center gap-5">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-muted hover:text-ink"
                  aria-label={social.label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
            <button
              onClick={toggleTheme}
              className="text-ink-muted hover:text-ink"
              aria-label={`Theme: ${preference}. Cycle theme.`}
              type="button"
            >
              {preference === "system" ? (
                <Monitor className="h-5 w-5" />
              ) : preference === "dark" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </button>
          </div>
          <Button className="w-full" link="/contact" onClick={handleClose}>
            Get in touch
          </Button>
        </div>
      </div>
    </div>
  );
}
