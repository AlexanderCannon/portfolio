import Link from "next/link";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Sophia's Future Doctor Club — daily picks for future doctors",
  description:
    "Weekly club picks, quick reflections, badges, and streaks for students curious about medicine. No account, no ads — everything stays on your device.",
};

const features = [
  {
    title: "Weekly club picks",
    body: "Science, math, reading, writing, service, and more — one small pick at a time, about 15–30 minutes each.",
  },
  {
    title: "Club Notes diary",
    body: "Write short reflections after you finish a pick. One or two sentences is plenty — it's your private future-doctor journal.",
  },
  {
    title: "XP, ranks, and badges",
    body: "Earn progress that never resets. Show up consistently to unlock ranks and badges without guilt or leaderboards.",
  },
  {
    title: "Built for real life",
    body: "Swap today's pick, move one to another day, or log your own thing when life doesn't match the plan. Resilience over perfection.",
  },
  {
    title: "Private by design",
    body: "No account or sign-in. No ads, no tracking, no cloud sync. Your name, picks, and notes stay on your phone or tablet.",
  },
  {
    title: "Optional reminders",
    body: "Set a daily reminder at a time you choose. The app only asks for notification permission when you turn that on.",
  },
] as const;

export default function SophiaFutureDoctorClubLandingPage() {
  return (
    <main>
      <section className="border-b border-[#D4C8E8] bg-gradient-to-b from-[#1E3D42] to-[#2a5560] px-4 py-20 text-center text-[#FBF7F0]">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#F87878]">
          Education · Habits · Medicine curiosity
        </p>
        <h1 className="mx-auto max-w-3xl font-serif text-4xl font-bold leading-tight sm:text-5xl">
          Tiny picks. Big white-coat energy.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[#FBF7F0]/90">
          Sophia&apos;s Future Doctor Club helps aspiring future doctors build the habits that matter — science curiosity,
          reading, writing, math confidence, service, and reflection.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <span className="rounded-full border border-[#20B0B8]/50 bg-[#1E3D42] px-6 py-3 text-sm font-semibold text-[#20B0B8]">
            App Store — link here when live
          </span>
          <Link
            href="/sophias-future-doctor-club/privacy"
            className="text-sm font-semibold text-[#FBF7F0] underline decoration-[#20B0B8] decoration-2 underline-offset-4 hover:text-[#20B0B8]"
          >
            Privacy policy
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-center font-serif text-3xl font-bold text-[#1E3D42]">What you&apos;ll do</h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[#7A6E88]">
          Gentle structure for students who are curious about medicine and want a low-pressure way to build serious study habits.
        </p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <li
              key={f.title}
              className="rounded-xl border border-[#D4C8E8] bg-white p-6 shadow-sm transition hover:border-[#20B0B8]/50 hover:shadow-md"
            >
              <h3 className="text-lg font-bold text-[#1E3D42]">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-[#7A6E88]">{f.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-[#D4C8E8] bg-white px-4 py-12">
        <div className="mx-auto max-w-3xl rounded-xl border border-[#D4C8E8] bg-[#FFE8E8]/40 p-8 text-center">
          <h2 className="font-serif text-xl font-bold text-[#1E3D42]">Disclaimer</h2>
          <p className="mt-3 text-[#7A6E88] leading-relaxed">
            Sophia&apos;s Future Doctor Club is an educational habit-building app. It does not provide medical advice,
            diagnosis, treatment guidance, or professional academic advising.
          </p>
        </div>
      </section>

      <section className="border-t border-[#D4C8E8] bg-[#FBF7F0] px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-2xl font-bold text-[#1E3D42]">Questions or need help?</h2>
          <p className="mt-3 text-[#7A6E88]">
            For privacy questions, see the policy below. For app support, email us or use the site contact form.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/sophias-future-doctor-club/support"
              className="inline-block rounded-lg bg-[#20B0B8] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#18A0A8]"
            >
              Support
            </Link>
            <Link
              href="/contact"
              className="inline-block rounded-lg border border-[#D4C8E8] bg-white px-6 py-3 text-sm font-bold text-[#1E3D42] transition hover:border-[#20B0B8]/50"
            >
              Contact Alexander
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
