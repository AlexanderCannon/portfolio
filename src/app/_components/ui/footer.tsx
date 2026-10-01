import React from "react";
import Link from "next/link";

function CompassRose({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden
      fill="currentColor"
    >
      <circle
        cx="20"
        cy="20"
        r="18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.45"
      />
      <circle
        cx="20"
        cy="20"
        r="3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />
      <path d="M20 4 L22.2 18 L20 16.5 L17.8 18 Z" opacity="0.95" />
      <path d="M20 36 L17.8 22 L20 23.5 L22.2 22 Z" opacity="0.45" />
      <path d="M4 20 L18 17.8 L16.5 20 L18 22.2 Z" opacity="0.45" />
      <path d="M36 20 L22 22.2 L23.5 20 L22 17.8 Z" opacity="0.45" />
      <text
        x="20"
        y="9"
        textAnchor="middle"
        fontSize="5"
        fontFamily="var(--font-mono), monospace"
        opacity="0.7"
      >
        N
      </text>
    </svg>
  );
}

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-dashed border-line bg-leather text-[hsl(40_32%_86%)]">
      <div className="mx-auto grid max-w-shell gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.2fr_1fr_1fr_auto]">
        <div>
          <p className="font-display text-xl tracking-tight text-[hsl(40_40%_90%)]">
            Alexander Cannon
          </p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-[hsl(36_20%_68%)]">
            Engineering leader and builder. Apps, tools, and systems that earn
            their keep.
          </p>
        </div>

        <div>
          <p className="font-label text-accent">Correspondence</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link
                href="/projects"
                className="text-[hsl(40_32%_86%)] hover:text-accent"
              >
                Projects
              </Link>
            </li>
            <li>
              <a
                href="https://alexandercannon.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[hsl(40_32%_86%)] hover:text-accent"
              >
                Substack
              </a>
            </li>
            <li>
              <Link
                href="/print"
                className="text-[hsl(40_32%_86%)] hover:text-accent"
              >
                Print resume
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-[hsl(40_32%_86%)] hover:text-accent"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="text-[hsl(40_32%_86%)] hover:text-accent"
              >
                Privacy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-label text-accent">Contact</p>
          <p className="mt-3 text-sm">
            <a
              href="mailto:alexander@farpointlabs.com"
              className="hover:text-accent"
            >
              alexander@farpointlabs.com
            </a>
          </p>
          <div className="mt-4 flex gap-4 font-mono text-[11px] uppercase tracking-[0.12em] text-[hsl(36_20%_68%)]">
            <a
              href="https://x.com/alexmcan"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[hsl(40_32%_86%)]"
            >
              X
            </a>
            <a
              href="https://linkedin.com/in/alexandermcannon"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[hsl(40_32%_86%)]"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/AlexanderCannon"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[hsl(40_32%_86%)]"
            >
              GitHub
            </a>
            <a
              href="https://alexandercannon.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[hsl(40_32%_86%)]"
            >
              Substack
            </a>
          </div>
        </div>

        <div className="hidden items-start justify-end md:flex">
          <CompassRose className="h-12 w-12 text-accent" />
        </div>
      </div>

      <div className="border-t border-dashed border-[hsl(36_20%_28%)] px-5 py-4 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-[hsl(36_20%_58%)] sm:px-8">
        © {new Date().getFullYear()} Alexander Cannon
      </div>
    </footer>
  );
};

export default Footer;
