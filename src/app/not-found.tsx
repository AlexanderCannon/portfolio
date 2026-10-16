import Link from "next/link";
import PageShell from "~/app/_components/ui/page-shell";
import Button from "~/app/_components/ui/button";
import { ContourRule, SectionLabel } from "~/app/_components/ui/survey-chrome";

export default function NotFound() {
  return (
    <PageShell>
      <SectionLabel>404</SectionLabel>
      <ContourRule />
      <h1 className="engraved mt-5 font-display text-5xl tracking-tight text-ink sm:text-7xl">
        Page not found
      </h1>
      <p className="mt-6 max-w-measure text-lg leading-relaxed text-ink-muted">
        This page may have moved, or the link may be incorrect.
      </p>
      <pre className="leather rivet mt-8 max-w-lg overflow-x-auto rounded-sm px-4 py-4 font-mono text-[13px] text-[hsl(40_32%_86%)]">
        {`$ open /
page not found
hint: try /projects or /contact`}
      </pre>
      <div className="mt-10 flex flex-wrap gap-4">
        <Button link="/">Home</Button>
        <Button link="/projects" variant="ghost">
          Projects
        </Button>
        <Link
          href="/contact"
          className="inline-flex items-center text-sm text-accent underline decoration-dashed underline-offset-4 hover:underline"
        >
          Contact
        </Link>
      </div>
    </PageShell>
  );
}
