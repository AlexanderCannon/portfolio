import Link from "next/link";
import { getLatestSubstack } from "~/lib/substack";
import HomeEditorialClient from "~/app/_components/sections/home-editorial-client";

export default async function HomeEditorial() {
  const substack = await getLatestSubstack();

  return (
    <>
      <HomeEditorialClient />
      {substack && (
        <div className="mx-auto max-w-shell px-5 pb-16 sm:px-8 sm:pb-20">
          <div className="border-t-2 border-ink pt-10">
            <p className="font-label text-ink-muted">From Substack</p>
            <Link
              href={substack.link}
              target="_blank"
              rel="noopener noreferrer"
              className="misregister mt-4 block font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl"
            >
              {substack.title}
            </Link>
            {substack.date && (
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
                {new Date(substack.date).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
