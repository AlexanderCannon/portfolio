import Link from "next/link";
import { type Metadata } from "next";

const SUPPORT_EMAIL = "a.m.t.cannon@gmail.com";

export const metadata: Metadata = {
  title: "Privacy policy — Sophia's Future Doctor Club",
  description:
    "How Sophia's Future Doctor Club handles your information. Everything stays on your device — no account, no ads, no tracking.",
};

export default function SophiaPrivacyPage() {
  return (
    <main className="bg-[#FBF7F0] px-4 py-14 text-[#1E3D42]">
      <div className="mx-auto max-w-3xl space-y-8 leading-relaxed">
        <header>
          <h1 className="font-serif text-4xl font-bold text-[#1E3D42]">
            Privacy policy — Sophia&apos;s Future Doctor Club
          </h1>
          <p className="mt-4 text-[#7A6E88]">
            <strong className="text-[#1E3D42]">Last updated:</strong> June 2026. This policy describes the Sophia&apos;s
            Future Doctor Club mobile application and related pages at{" "}
            <Link
              href="/sophias-future-doctor-club"
              className="font-semibold text-[#20B0B8] underline-offset-2 hover:underline"
            >
              alexandercannon.dev/sophias-future-doctor-club
            </Link>
            . The operator is Alexander Cannon.
          </p>
        </header>

        <section>
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#1E3D42]">Summary</h2>
          <ul className="list-disc space-y-2 pl-5 text-[#1E3D42]">
            <li>Your name and progress stay on your phone or tablet</li>
            <li>No account or sign-in needed</li>
            <li>No ads</li>
            <li>We do not collect your information or send it anywhere</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#1E3D42]">What the app saves</h2>
          <p className="mb-2 text-[#1E3D42]">The app keeps the following on your phone or tablet:</p>
          <ul className="list-disc space-y-2 pl-5 text-[#1E3D42]">
            <li>Pick progress and what you have completed</li>
            <li>Club Notes (your reflection journal)</li>
            <li>Badges you have earned</li>
            <li>Your settings (name, reminder time, theme)</li>
            <li>Notes you leave when you skip a pick</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#1E3D42]">Stays on your device</h2>
          <p className="text-[#1E3D42]">
            Nothing you save in the app is sent online. There is no account, online backup, or way to share your progress
            with other people.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#1E3D42]">What we do not collect</h2>
          <ul className="list-disc space-y-2 pl-5 text-[#1E3D42]">
            <li>No sign-in or account</li>
            <li>We do not know where you are</li>
            <li>We do not look at your contacts</li>
            <li>We do not collect health information</li>
            <li>We do not track how you use the app</li>
            <li>No ads that follow you around</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#1E3D42]">Reminders</h2>
          <p className="text-[#1E3D42]">
            You can set a daily reminder in Settings. The app only asks for permission when you turn that on. Reminders
            come from the app on your device — not from us over the internet.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#1E3D42]">Kids &amp; teens</h2>
          <p className="text-[#1E3D42]">
            This app is for students curious about medicine. We do not collect your information to send it anywhere
            online.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#1E3D42]">Disclaimer</h2>
          <p className="text-[#1E3D42]">
            Sophia&apos;s Future Doctor Club is an educational habit-building app. It does not provide medical advice,
            diagnosis, treatment guidance, or professional academic advising.
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#1E3D42]">Contact</h2>
          <p className="text-[#1E3D42]">
            For questions about this policy, email{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Sophia's Future Doctor Club — Privacy")}`}
              className="font-semibold text-[#20B0B8] underline-offset-2 hover:underline"
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="mb-2 font-serif text-2xl font-bold text-[#1E3D42]">Changes</h2>
          <p className="text-[#1E3D42]">
            We may update this policy from time to time. When we do, the date at the top of this page will change.
          </p>
          <p className="mt-4 text-sm">
            <Link
              href="/sophias-future-doctor-club/support"
              className="font-semibold text-[#20B0B8] underline-offset-2 hover:underline"
            >
              Support
            </Link>
            <span className="text-[#7A6E88]"> · </span>
            <Link
              href="/sophias-future-doctor-club"
              className="font-semibold text-[#20B0B8] underline-offset-2 hover:underline"
            >
              App home
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
