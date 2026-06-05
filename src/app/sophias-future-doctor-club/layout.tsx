import Link from "next/link";
import { type Metadata } from "next";

const base = "/sophias-future-doctor-club";

export const metadata: Metadata = {
  title: "Sophia's Future Doctor Club",
  description:
    "Tiny picks. Big white-coat energy. Weekly club picks, reflections, badges, and streaks — all private on your device.",
  openGraph: {
    title: "Sophia's Future Doctor Club",
    description:
      "Educational habit-building for aspiring future doctors — weekly picks, club notes, and progress that stays on your device.",
    url: "https://alexandercannon.dev/sophias-future-doctor-club",
    siteName: "Alexander Cannon",
    type: "website",
  },
};

export default function SophiaFutureDoctorClubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-[#FBF7F0] text-[#1E3D42]">
      <header className="border-b border-[#D4C8E8] bg-[#1E3D42] text-[#FBF7F0]">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <Link
            href={base}
            className="text-lg font-bold tracking-[0.06em] text-[#20B0B8] sm:text-xl"
          >
            Sophia&apos;s Future Doctor Club
          </Link>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold">
            <Link href={base} className="transition hover:text-[#20B0B8]">
              Home
            </Link>
            <Link href={`${base}/privacy`} className="transition hover:text-[#20B0B8]">
              Privacy
            </Link>
            <Link href={`${base}/support`} className="transition hover:text-[#20B0B8]">
              Support
            </Link>
            <Link href="/contact" className="transition hover:text-[#20B0B8]">
              Contact
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="mt-auto border-t border-[#D4C8E8] bg-[#1E3D42] py-10 text-center text-sm text-[#FBF7F0]/85">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4">
          <p className="font-medium text-[#FBF7F0]">
            Sophia&apos;s Future Doctor Club — an app by Alexander Cannon.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            <Link
              href={`${base}/privacy`}
              className="text-[#20B0B8] underline-offset-2 hover:underline"
            >
              Privacy policy
            </Link>
            <Link
              href={`${base}/support`}
              className="text-[#20B0B8] underline-offset-2 hover:underline"
            >
              Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
