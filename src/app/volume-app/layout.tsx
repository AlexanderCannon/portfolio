import Link from "next/link";
import { type Metadata } from "next";

const base = "/volume-app";

export const metadata: Metadata = {
  title: "VOLUME",
  description:
    "VOLUME is a reading companion for iOS and Android — log sessions, curate your shelf, and keep streaks without losing the joy of the page.",
  openGraph: {
    title: "VOLUME — reading companion",
    description: "Track reading sessions, shelf, and streaks in one calm app.",
    url: "https://alexandercannon.dev/volume-app",
    siteName: "Alexander Cannon",
    type: "website"
  }
};

export default function VolumeAppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-8rem)] bg-[#F5F1E8] text-[#132C4B]">
      <header className="border-b border-[#D7D0C2] bg-[#132C4B] text-[#F5F1E8]">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <Link href={base} className="text-xl font-bold tracking-[0.12em] text-[#42C7A1]">
            VOLUME
          </Link>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold">
            <Link href={base} className="transition hover:text-[#42C7A1]">
              Home
            </Link>
            <Link href={`${base}/privacy`} className="transition hover:text-[#42C7A1]">
              Privacy
            </Link>
            <Link href={`${base}/terms`} className="transition hover:text-[#42C7A1]">
              Terms
            </Link>
            <Link href="/contact" className="transition hover:text-[#42C7A1]">
              Contact
            </Link>
          </nav>
        </div>
      </header>
      {children}
      <footer className="mt-auto border-t border-[#D7D0C2] bg-[#132C4B] py-10 text-center text-sm text-[#F5F1E8]/85">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 px-4">
          <p className="font-medium text-[#F5F1E8]">VOLUME — a reading app by Alexander Cannon.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            <Link
              href={`${base}/privacy`}
              className="text-[#42C7A1] underline-offset-2 hover:underline"
            >
              Privacy policy
            </Link>
            <Link
              href={`${base}/terms`}
              className="text-[#42C7A1] underline-offset-2 hover:underline"
            >
              Terms of service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
