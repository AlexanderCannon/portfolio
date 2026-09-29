import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-line bg-paper">
      <div className="mx-auto grid max-w-shell gap-10 px-5 py-12 sm:px-8 md:grid-cols-3">
        <div>
          <p className="font-display text-lg text-ink">Alexander Cannon</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-ink-muted">
            Engineering leader and builder. Apps, tools, and systems that earn
            their keep.
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
            Elsewhere
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/about" className="text-ink hover:text-accent">
                About
              </Link>
            </li>
            <li>
              <Link href="/projects" className="text-ink hover:text-accent">
                Projects
              </Link>
            </li>
            <li>
              <a
                href="https://alexandercannon.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-accent"
              >
                Substack
              </a>
            </li>
            <li>
              <Link href="/contact" className="text-ink hover:text-accent">
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="text-ink hover:text-accent"
              >
                Privacy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
            Contact
          </p>
          <p className="mt-3 text-sm text-ink">
            <a
              href="mailto:alexander@farpointlabs.com"
              className="hover:text-accent"
            >
              alexander@farpointlabs.com
            </a>
          </p>
          <div className="mt-4 flex gap-4 text-sm text-ink-muted">
            <a
              href="https://x.com/alexmcan"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink"
            >
              X
            </a>
            <a
              href="https://linkedin.com/in/alexandermcannon"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/AlexanderCannon"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink"
            >
              GitHub
            </a>
            <a
              href="https://alexandercannon.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink"
            >
              Substack
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-line px-5 py-4 text-center text-xs text-ink-muted sm:px-8">
        © {new Date().getFullYear()} Alexander Cannon
      </div>
    </footer>
  );
};

export default Footer;
