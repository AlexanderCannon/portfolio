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
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, textShadow: "2px 0 0 hsl(355 72% 38% / 0.9), -2px 0 0 hsl(190 70% 38% / 0.6)" }}
            animate={{
              opacity: 1,
              textShadow: "0 0 0 transparent, 0 0 0 transparent",
            }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="font-display text-[clamp(3.25rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-tighter text-ink"
          >
            Alexander
            <br />
            Cannon
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.12 }}
            className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted sm:text-xl"
          >
            I build products people come back to — reading apps, family tools,
            language experiments, and CLI utilities that stay out of the way.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.18 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Button link="/projects">See the work</Button>
            <Button link="/contact" variant="link">
              Say hello
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.14 }}
          className="hidden h-full max-h-[36rem] lg:block"
        >
          <HomeTerminalPanel />
        </motion.div>
      </div>

      <div className="mt-16 border-t-2 border-ink pt-10 lg:mt-20">
        <p className="font-label text-ink-muted">Lately</p>
        <ul className="mt-6 divide-y divide-line border-b border-line">
          {featured.map((item, index) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
                delay: 0.22 + index * 0.06,
              }}
            >
              <Link
                href={item.href}
                className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <span className="misregister font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                  {item.title}
                </span>
                <span className="max-w-md text-sm text-ink-muted sm:text-right">
                  {item.blurb}
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
