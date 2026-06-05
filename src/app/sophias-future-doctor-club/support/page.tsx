import Link from "next/link";
import { type Metadata } from "next";

const SUPPORT_EMAIL = "a.m.t.cannon@gmail.com";
const MAILTO = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Sophia's Future Doctor Club — Support")}`;

export const metadata: Metadata = {
  title: "Support — Sophia's Future Doctor Club",
  description: "Get help with Sophia's Future Doctor Club — picks, reminders, progress, and more.",
};

export default function SophiaSupportPage() {
  return (
    <main className="bg-[#FBF7F0] px-4 py-14 text-[#1E3D42]">
      <div className="mx-auto max-w-3xl space-y-8 leading-relaxed">
        <header>
          <h1 className="font-serif text-4xl font-bold text-[#1E3D42]">
            Support — Sophia&apos;s Future Doctor Club
          </h1>
          <p className="mt-4 text-[#7A6E88]">
            Need help with picks, reminders, or progress? Send us an email and we&apos;ll get back to you.
          </p>
        </header>

        <section className="rounded-xl border border-[#D4C8E8] bg-white p-8 shadow-sm">
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#1E3D42]">Email</h2>
          <a
            href={MAILTO}
            className="text-lg font-semibold text-[#20B0B8] underline-offset-2 hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>
          <p className="mt-4 text-[#7A6E88]">
            Tap the address above to open your mail app with a pre-filled subject line.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#1E3D42]">What to include</h2>
          <ul className="list-disc space-y-2 pl-5 text-[#1E3D42]">
            <li>A short description of what went wrong</li>
            <li>What kind of phone or tablet you are using (if that helps)</li>
            <li>What you were doing when the problem happened</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#1E3D42]">Privacy</h2>
          <p className="text-[#1E3D42]">
            The app stores your progress locally on your device. We do not have access to your picks, club notes, or
            badges. Support emails may include information you choose to share with us.
          </p>
        </section>

        <section>
          <p className="text-sm">
            <Link
              href="/sophias-future-doctor-club/privacy"
              className="font-semibold text-[#20B0B8] underline-offset-2 hover:underline"
            >
              Privacy policy
            </Link>
            <span className="text-[#7A6E88]"> · </span>
            <Link
              href="/sophias-future-doctor-club"
              className="font-semibold text-[#20B0B8] underline-offset-2 hover:underline"
            >
              App home
            </Link>
            <span className="text-[#7A6E88]"> · </span>
            <Link href="/contact" className="font-semibold text-[#20B0B8] underline-offset-2 hover:underline">
              Site contact form
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
