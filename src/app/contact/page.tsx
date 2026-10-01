import React from "react";
import LeadCaptureForm from "~/app/_components/sections/lead-capture-form";
import PageShell from "~/app/_components/ui/page-shell";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Alexander Cannon",
};

const ContactPage: React.FC = () => {
  return (
    <PageShell>
      <header className="max-w-measure">
        <p className="font-label text-accent">Correspondence</p>
        <h1 className="engraved mt-3 font-display text-4xl tracking-tight text-ink sm:text-5xl">
          Say hello
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          A question, a collaboration, or just a note — I read every message.
        </p>
      </header>

      <div className="mt-12 grid gap-14 lg:grid-cols-[1fr_0.7fr] lg:gap-20">
        <LeadCaptureForm />

        <aside className="space-y-8 text-sm text-ink-muted lg:pt-2">
          <div>
            <p className="font-label text-ink">Email</p>
            <a
              href="mailto:alexander@farpointlabs.com"
              className="mt-2 inline-block text-base text-accent underline decoration-dashed underline-offset-4 hover:underline"
            >
              alexander@farpointlabs.com
            </a>
          </div>
          <div>
            <p className="font-label text-ink">Around the web</p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="https://x.com/alexmcan"
                  className="hover:text-ink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X / Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/alexandermcannon"
                  className="hover:text-ink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/AlexanderCannon"
                  className="hover:text-ink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://alexandercannon.substack.com/"
                  className="hover:text-ink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Substack
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </PageShell>
  );
};

export default ContactPage;
