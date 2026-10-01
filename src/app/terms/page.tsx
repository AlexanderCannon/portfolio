import React from "react";
import PageShell from "~/app/_components/ui/page-shell";

const TermsAndConditions: React.FC = () => {
  return (
    <PageShell narrow className="space-y-8">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
          Legal
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink">
          Terms and conditions
        </h1>
        <p className="mt-2 text-sm text-ink-muted">Last updated: October 1, 2023</p>
      </header>

      <section className="space-y-2 text-ink-muted">
        <h2 className="font-display text-2xl text-ink">1. Introduction</h2>
        <p>
          By accessing or using this site or related apps, you agree to these
          terms. If you do not agree, do not use them.
        </p>
      </section>

      <section className="space-y-2 text-ink-muted">
        <h2 className="font-display text-2xl text-ink">2. Use</h2>
        <p>
          Use the site and apps only for lawful purposes and in ways that do not
          infringe others&apos; rights or enjoyment.
        </p>
      </section>

      <section className="space-y-2 text-ink-muted">
        <h2 className="font-display text-2xl text-ink">3. Intellectual property</h2>
        <p>
          Content – text, graphics, logos, images, and software – is protected by
          intellectual property laws and owned by the respective owners.
        </p>
      </section>

      <section className="space-y-2 text-ink-muted">
        <h2 className="font-display text-2xl text-ink">4. Privacy</h2>
        <p>
          See the privacy policy for how information is handled. Individual apps
          may have their own policies.
        </p>
      </section>

      <section className="space-y-2 text-ink-muted">
        <h2 className="font-display text-2xl text-ink">5. Liability</h2>
        <p>
          Software and content are provided &quot;as is&quot; without warranties
          of merchantability, fitness for a particular purpose, or
          non-infringement.
        </p>
      </section>

      <section className="space-y-2 text-ink-muted">
        <h2 className="font-display text-2xl text-ink">6. Contact</h2>
        <p>
          Questions:{" "}
          <a
            href="mailto:alexander@farpointlabs.com"
            className="text-accent hover:underline"
          >
            alexander@farpointlabs.com
          </a>
        </p>
      </section>
    </PageShell>
  );
};

export default TermsAndConditions;
