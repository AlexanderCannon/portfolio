"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PageShell from "~/app/_components/ui/page-shell";
import Button from "~/app/_components/ui/button";
import HomeTerminalPanel from "~/app/_components/sections/home-terminal-panel";
import { projects } from "~/app/projects/data";

const latest = projects[0]!;
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

const languages = ["TypeScript", "Rust", "Python", "Go"];
const tools = [
  "React",
  "Expo",
  "Next.js",
  "AWS",
  "Postgres",
  "Redis",
  "Kafka",
];

export default function HomeEditorialClient() {
  // ponytail: terminal is desktop-only — don't mount (or hint) on mobile
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <PageShell className="py-12 sm:py-16 lg:py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14 lg:min-h-[calc(100vh-14rem)]">
        <div className="max-w-2xl">
          <motion.h1
            initial={{
              opacity: 0,
              textShadow:
                "2px 0 0 hsl(355 72% 38% / 0.9), -2px 0 0 hsl(190 70% 38% / 0.6)",
            }}
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

        {desktop && (
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.14 }}
            className="h-full max-h-[36rem]"
          >
            <HomeTerminalPanel />
          </motion.div>
        )}
      </div>

      <section
        id="about"
        className="mt-16 scroll-mt-24 border-t-2 border-ink pt-12 lg:mt-20 lg:pt-16"
      >
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:gap-16 md:items-start">
          <div className="max-w-measure space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg">
            <p>
              I have spent most of my career in the places where software meets
              real weather – Discovery&apos;s early live streaming, regulated
              fintech, blockchain experiments, LLM tools that have to survive
              production data and a grudge. The job description always said
              implement and deliver. The actual work was taking ambiguity and
              bad incentives and somehow producing something sturdy enough that
              other people could stand on it.
            </p>
            <p>
              These days I split time between shipping my own products and the
              unglamorous leadership work: noticing the wobble before anyone else
              does, keeping architecture honest, writing for the next person –
              including future me, who will be tired and annoyed.
            </p>
            <p>
              Away from the keyboard: strings, early miles, trails, foreign
              sidewalks, unread spines, and a bike that folds into luggage.
            </p>
          </div>
          <div className="relative aspect-[4/5] max-w-md overflow-hidden rounded-sm border-2 border-ink bg-secondary md:max-w-none">
            <Image
              src="/images/working.png"
              alt="Alexander at work"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>
      </section>

      <section className="mt-16 border-t-2 border-ink pt-12 lg:mt-20 lg:pt-16">
        <p className="font-label text-ink-muted">Stack</p>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 sm:gap-x-8">
          {languages.map((lang) => (
            <li
              key={lang}
              className="misregister font-display text-[clamp(2.5rem,5.5vw,4rem)] font-semibold leading-none tracking-tighter text-ink"
            >
              {lang}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
          {tools.join(" · ")}
        </p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
          Last ship ·{" "}
          <Link
            href={`/projects/${latest.slug}`}
            className="text-accent hover:underline"
          >
            {latest.title}
          </Link>
        </p>
      </section>

      <div className="mt-16 border-t-2 border-ink pt-10 lg:mt-20">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="font-label text-ink-muted">Lately</p>
          <Link
            href="/projects"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent underline-offset-4 hover:underline"
          >
            See more
          </Link>
        </div>
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
                  <span className="mr-3 font-mono text-sm text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
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
