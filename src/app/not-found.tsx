import Link from "next/link";
import PageShell from "~/app/_components/ui/page-shell";
import Button from "~/app/_components/ui/button";

export default function NotFound() {
  return (
    <PageShell>
      <p className="font-label text-accent">Form not found</p>
      <h1 className="misregister mt-3 font-display text-5xl font-semibold tracking-tighter text-ink sm:text-7xl">
        404
      </h1>
      <p className="mt-6 max-w-measure text-lg leading-relaxed text-ink-muted">
        Check registration marks. This sheet is not on the press — the folio
        may have been moved, renamed, or never existed.
      </p>
      <pre className="mt-8 max-w-lg overflow-x-auto rounded-sm border-2 border-ink bg-[#12100e] px-4 py-4 font-mono text-[13px] text-[#e8e2d9]">
        {`$ open /
form not found — check registration
hint: try /projects or /contact`}
      </pre>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button link="/">Home</Button>
        <Button link="/projects" variant="ghost">
          Projects
        </Button>
        <Link
          href="/contact"
          className="inline-flex items-center text-sm text-accent underline-offset-4 hover:underline"
        >
          Contact
        </Link>
      </div>
    </PageShell>
  );
}
