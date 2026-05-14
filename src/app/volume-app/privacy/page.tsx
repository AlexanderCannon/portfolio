import Link from "next/link";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy — VOLUME",
  description: "How VOLUME collects, uses, and protects your information."
};

export default function VolumePrivacyPage() {
  return (
    <main className="bg-[#F5F1E8] px-4 py-14 text-[#132C4B]">
      <div className="mx-auto max-w-3xl space-y-8 leading-relaxed">
        <header>
          <h1 className="font-serif text-4xl font-bold text-[#132C4B]">Privacy policy — VOLUME</h1>
          <p className="mt-4 text-[#6D7785]">
            <strong className="text-[#132C4B]">Effective date:</strong> May 13, 2026. This policy describes the VOLUME mobile application
            and related pages at{" "}
            <Link href="/volume-app" className="font-semibold text-[#0f766e] underline-offset-2 hover:underline">
              alexandercannon.dev/volume-app
            </Link>
            . The operator is Alexander Cannon (&quot;we&quot;, &quot;us&quot;).
          </p>
        </header>

        <section>
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#132C4B]">Summary</h2>
          <p className="text-[#132C4B]">
            VOLUME is a reading companion. We process account and reading data so the app can work — sign-in (Clerk), database and APIs
            (Supabase), optional push notifications (Expo), and server-side book search (Google Books). We do not sell your personal
            information.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#132C4B]">What we collect</h2>
          <ul className="list-disc space-y-3 pl-5 text-[#132C4B]">
            <li>
              <strong>Account and authentication.</strong> If you use VOLUME, Clerk processes identifiers such as email address and
              Apple-provided tokens as part of sign-in. We receive a stable user id from Clerk that we use as your primary key in our
              backend.
            </li>
            <li>
              <strong>Profile and reading activity.</strong> You may provide a display name, username, bio, reading preferences
              (genres/tags), goals, and reminder times. We store reading sessions (for example pages read, duration, timestamps), books
              on your shelf, feed-related events you create, follows, and similar app content you choose to save.
            </li>
            <li>
              <strong>Device and notifications.</strong> If you grant permission, we may register an Expo push token with our backend so
              we can target optional reminders to your device. You can revoke notification permission in your device settings.
            </li>
            <li>
              <strong>Book search queries.</strong> When you search for a book, that query is sent to our Supabase Edge Function, which
              may call Google Books to return metadata (title, authors, cover, page count). Queries may be cached briefly server-side
              to improve performance and reduce duplicate upstream calls.
            </li>
            <li>
              <strong>Diagnostics and product analytics.</strong> The app may emit basic analytics events during development; production
              analytics depend on configuration. This marketing site may use cookies or similar technologies as described in the main site
              experience when you browse these pages.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#132C4B]">Why we use data</h2>
          <ul className="list-disc space-y-2 pl-5 text-[#132C4B]">
            <li>Provide core features (sessions, shelf, streaks, feed, reminders).</li>
            <li>Maintain security, prevent abuse, and enforce rate limits on search.</li>
            <li>Improve reliability and fix bugs.</li>
            <li>Comply with law or respond to lawful requests.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#132C4B]">Legal bases (EEA / UK users)</h2>
          <p className="text-[#132C4B]">
            Where GDPR applies, we rely on performance of a contract (providing the service you asked for), legitimate interests (for
            example securing the service and improving reliability), and consent where required (for example certain notifications or
            optional analytics, depending on your platform and settings).
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#132C4B]">Processors and third parties</h2>
          <p className="mb-2 text-[#132C4B]">We use service providers that process data on our instructions, including:</p>
          <ul className="list-disc space-y-2 pl-5 text-[#132C4B]">
            <li>Clerk — authentication.</li>
            <li>Supabase — database, authentication bridge, and Edge Functions.</li>
            <li>Expo — push notification infrastructure when enabled.</li>
            <li>Google Books API — book metadata for search (server-side only).</li>
          </ul>
          <p className="mt-3 text-[#132C4B]">
            Those providers have their own privacy policies. We choose configurations intended to minimize data exposure (for example,
            keeping API keys off the client for book search).
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#132C4B]">Retention</h2>
          <p className="text-[#132C4B]">
            We keep information as long as your account is active and as needed to provide the service, comply with legal obligations,
            resolve disputes, and enforce agreements. Cached search rows may persist for a limited time to improve performance.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#132C4B]">Your choices and rights</h2>
          <ul className="list-disc space-y-2 pl-5 text-[#132C4B]">
            <li>Access, correct, or delete certain profile fields inside the app where supported.</li>
            <li>Delete your account or request deletion where available in the product or by contacting us.</li>
            <li>Object to or restrict certain processing where applicable law provides those rights.</li>
            <li>Lodge a complaint with your local supervisory authority.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#132C4B]">Children</h2>
          <p className="text-[#132C4B]">
            VOLUME is not directed at children under 13 (or the age required by your region). If you believe we have collected
            information from a child, contact us and we will take appropriate steps.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#132C4B]">International transfers</h2>
          <p className="text-[#132C4B]">
            Our providers may process data in the United States and other countries. Where required, we rely on appropriate safeguards
            such as standard contractual clauses.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#132C4B]">Changes</h2>
          <p className="text-[#132C4B]">
            We may update this policy from time to time. We will post the new version on this page and update the effective date. If
            changes are material, we will provide additional notice as required by law or as we reasonably determine is appropriate in
            the product.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#132C4B]">Contact</h2>
          <p className="text-[#132C4B]">
            Questions about this policy: use the{" "}
            <Link href="/contact" className="font-semibold text-[#0f766e] underline-offset-2 hover:underline">
              contact form
            </Link>{" "}
            on this site and mention &quot;VOLUME&quot; in your message.
          </p>
          <p className="mt-4 text-sm">
            <Link href="/volume-app/terms" className="font-semibold text-[#0f766e] underline-offset-2 hover:underline">
              Terms of service
            </Link>
            <span className="text-[#6D7785]"> · </span>
            <Link href="/volume-app" className="font-semibold text-[#0f766e] underline-offset-2 hover:underline">
              VOLUME home
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
