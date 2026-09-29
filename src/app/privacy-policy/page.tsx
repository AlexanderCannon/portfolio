import React from "react";
import PageShell from "~/app/_components/ui/page-shell";

export default function PrivacyPolicyPage() {
  return (
    <PageShell narrow className="space-y-10">
      <header>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-accent">
          Legal
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight text-ink">
          Privacy policy
        </h1>
        <p className="mt-4 text-lg text-ink-muted">
          How this site collects, uses, and protects personal information.
        </p>
      </header>

      <section className="space-y-3 text-ink-muted">
        <h2 className="font-display text-2xl text-ink">Information we collect</h2>
        <p>
          We may collect name, email, phone number, and company details when you
          contact us. We also collect usage data through cookies and analytics.
        </p>
      </section>

      <section className="space-y-3 text-ink-muted">
        <h2 className="font-display text-2xl text-ink">How we use it</h2>
        <ul className="list-disc space-y-1 pl-5">
          <li>To provide and improve services</li>
          <li>To respond to inquiries</li>
          <li>To send updates when you opt in</li>
          <li>To understand how the site is used</li>
        </ul>
      </section>

      <section className="space-y-3 text-ink-muted">
        <h2 className="font-display text-2xl text-ink">Sharing</h2>
        <p>
          We do not sell personal information. We may share data with trusted
          providers who help operate the site (hosting, analytics), under
          confidentiality obligations.
        </p>
      </section>

      <section className="space-y-3 text-ink-muted">
        <h2 className="font-display text-2xl text-ink">Cookies</h2>
        <p>
          Cookies help analytics and site experience. You can control cookies in
          your browser; some features may not work without them.
        </p>
      </section>

      <section className="space-y-3 text-ink-muted">
        <h2 className="font-display text-2xl text-ink">Your rights</h2>
        <p>
          You can ask to access, update, or delete your information, or opt out
          of marketing. Contact{" "}
          <a
            href="mailto:alexander@farpointlabs.com"
            className="text-accent hover:underline"
          >
            alexander@farpointlabs.com
          </a>
          .
        </p>
      </section>

      <section className="space-y-3 text-ink-muted">
        <h2 className="font-display text-2xl text-ink">Contact</h2>
        <p>
          Questions about this policy:{" "}
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
}
