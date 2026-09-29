"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageShell from "~/app/_components/ui/page-shell";
import Button from "~/app/_components/ui/button";
import HomeTerminalPanel from "~/app/_components/sections/home-terminal-panel";

const featured = [
  {
    title: "VOLUME",
    blurb: "A calm reading companion — sessions, shelf, streaks.",
    href: "/projects/volume",
  },
  {
    title: "Sophia's Future Doctor Club",
    blurb: "Weekly missions for kids who want the white coat someday.",
    href: "/projects/sophias-future-doctor-club",
  },
  {
    title: "PathRanger",
    blurb: "Jump to the directories you already live in.",
    href: "/projects/pathranger",
  },
];

export default function HomeEditorial() {
  return (
    <PageShell className="py-12 sm:py-16 lg:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14 lg:min-h-[calc(100vh-14rem)]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            Engineering leader · builder
          </p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Alexander Cannon
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-muted sm:text-xl">
            I build products people actually use — reading apps, family tools,
            language experiments, and CLI utilities that stay out of the way.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button link="/projects">See the work</Button>
            <Button link="/contact" variant="link">
              Say hello
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          className="hidden h-full max-h-[36rem] lg:block"
        >
          <HomeTerminalPanel />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut", delay: 0.16 }}
        className="mt-16 border-t border-line pt-10 lg:mt-20"
      >
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-muted">
          Lately
        </p>
        <ul className="mt-6 divide-y divide-line">
          {featured.map((item) => (
            <li key={item.title}>
              <Link
                href={item.href}
                className="group flex flex-col gap-1 py-5 transition-transform duration-200 hover:translate-x-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <span className="font-display text-2xl text-ink group-hover:text-accent sm:text-3xl">
                  {item.title}
                </span>
                <span className="max-w-md text-sm text-ink-muted sm:text-right">
                  {item.blurb}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </PageShell>
  );
}
