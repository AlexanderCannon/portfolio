import Link from "next/link";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "VOLUME — reading companion",
  description:
    "Log focused reading sessions, keep your shelf and streaks in sync, and share progress with friends — built for people who still love paper and pixels."
};

const features = [
  {
    title: "Sessions that respect your flow",
    body: "Start a timed reading block, pause when life happens, and publish when you are done so your stats stay honest."
  },
  {
    title: "Shelf and progress in one place",
    body: "Track books you are reading, finished, or want next — with pages and pace so you always know where you left off."
  },
  {
    title: "Streaks without shame spirals",
    body: "Gentle streaks and reminders celebrate showing up; skipping a day does not erase who you are as a reader."
  },
  {
    title: "A small social layer",
    body: "Optional feed moments when you finish a book or hit a milestone — community without turning reading into a performance."
  },
  {
    title: "Sign in you can trust",
    body: "Accounts use Clerk (email code and Sign in with Apple). Reading data lives in your own Supabase-backed workspace, tied to your account."
  },
  {
    title: "Search, then own the metadata",
    body: "Look up titles via Google Books to add covers and page counts; search runs on our servers so keys never ship inside the app binary."
  }
] as const;

export default function VolumeAppLandingPage() {
  return (
    <main>
      <section className="border-b border-[#D7D0C2] bg-gradient-to-b from-[#132C4B] to-[#1a3d66] px-4 py-20 text-center text-[#F5F1E8]">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#42C7A1]">
          Reading companion
        </p>
        <h1 className="mx-auto max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl">
          Calm tracking for people who actually read
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[#F5F1E8]/90">
          VOLUME helps you log minutes and pages, curate your shelf, and keep streaks — without turning books into a leaderboard you
          did not ask for.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <span className="rounded-full border border-[#42C7A1]/50 bg-[#132C4B] px-6 py-3 text-sm font-semibold text-[#42C7A1]">
            App Store &amp; Google Play — link here when live
          </span>
          <Link
            href="/volume-app/privacy"
            className="text-sm font-semibold text-[#F5F1E8] underline decoration-[#42C7A1] decoration-2 underline-offset-4 hover:text-[#42C7A1]"
          >
            Privacy policy
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-center font-serif text-3xl font-bold text-[#132C4B]">What you get</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[#6D7785]">
          Built as a focused experience with a small surface area — fewer tabs, more
          chapters.
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <li
              key={f.title}
              className="rounded-xl border border-[#D7D0C2] bg-white p-6 shadow-sm transition hover:border-[#42C7A1]/50 hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-[#132C4B]">{f.title}</h3>
              <p className="mt-2 text-[#6D7785] leading-relaxed">{f.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-[#D7D0C2] bg-white px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-2xl font-bold text-[#132C4B]">Questions or data requests?</h2>
          <p className="mt-3 text-[#6D7785]">
            For privacy and terms, use the links above. For everything else, reach out via the site contact form.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-[#42C7A1] px-6 py-3 text-sm font-bold text-[#132C4B] transition hover:bg-[#3ab896]"
          >
            Contact Alexander
          </Link>
        </div>
      </section>
    </main>
  );
}
