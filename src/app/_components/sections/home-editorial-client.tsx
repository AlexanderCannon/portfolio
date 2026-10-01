"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import PageShell from "~/app/_components/ui/page-shell";
import Button from "~/app/_components/ui/button";
import Vista from "~/app/_components/ui/vista";
import ScrollTrail from "~/app/_components/ui/scroll-trail";
import HomeTerminalPanel from "~/app/_components/sections/home-terminal-panel";
import { projects } from "~/app/projects/data";
import { type SubstackPost } from "~/lib/substack";
import resume from "public/resume.json";

const latest = projects[0]!;
const selectedRoles = resume.experience.slice(0, 4);
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

const hobbies = [
  {
    name: "Guitar",
    blurb:
      "Left-handed, not especially well, on instruments that take up more air than my playing has earned.",
    image: "/images/guitar.png",
  },
  {
    name: "Running",
    blurb:
      "Most mornings before the day has formed an opinion. Hills when I can, pavement when I cannot.",
    image: "/images/running.png",
  },
  {
    name: "Hiking",
    blurb: "A sandwich in a pocket, boots, and weather that refuses to stay on message.",
    image: "/images/hiking.png",
  },
  {
    name: "Travel",
    blurb:
      "Cities arrived at with a loose plan. I wander until hunger becomes a compass.",
    image: "/images/travel.png",
  },
  {
    name: "Reading",
    blurb: "Stacks that grow faster than evenings. I buy books the way other people buy intentions.",
    image: "/images/reading.png",
  },
  {
    name: "Cycling",
    blurb:
      "A folding bike for trains, stairwells, and hotels with mixed sincerity about cyclists.",
    image: "/images/cycling.png",
  },
];

const viewport = { once: true, margin: "-60px" as const };

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

/** OS triangulation tick — draws in when the section arrives. */
function SurveyMark({ reduced }: { reduced: boolean }) {
  return (
    <motion.svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-hidden
      className="shrink-0 text-accent"
      initial={reduced ? false : { opacity: 0, rotate: -25 }}
      whileInView={{ opacity: 1, rotate: 0 }}
      viewport={viewport}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.circle
        cx="7"
        cy="7"
        r="5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        initial={reduced ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={viewport}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <path
        d="M7 1.5V12.5M1.5 7H12.5"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="square"
      />
      <circle cx="7" cy="7" r="1.15" fill="currentColor" />
    </motion.svg>
  );
}

function SectionLabel({
  children,
  reduced,
}: {
  children: ReactNode;
  reduced: boolean;
}) {
  return (
    <motion.div
      className="flex items-center gap-2.5"
      variants={fadeUp}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <SurveyMark reduced={reduced} />
      <p className="font-label text-ink-muted">{children}</p>
    </motion.div>
  );
}

/** Soft contour hatch under a section eyebrow. */
function ContourRule() {
  return (
    <motion.div
      aria-hidden
      className="map-rule mt-3 h-3 max-w-[9rem] opacity-70"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 0.7 }}
      viewport={viewport}
      transition={{ duration: 0.55, ease: "easeOut" }}
      style={{ originX: 0 }}
    />
  );
}

function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      data-trail-section
      className={`relative z-[1] ${className}`}
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {children}
    </motion.section>
  );
}

export default function HomeEditorialClient({
  substack,
}: {
  substack: SubstackPost | null;
}) {
  // ponytail: terminal is desktop-only — don't mount (or hint) on mobile
  const [desktop, setDesktop] = useState(false);
  const reduced = useReducedMotion() ?? false;
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <>
      <Vista>
        <div className="mx-auto max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="engraved font-display text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-tight text-[hsl(var(--vista-text))]"
          >
            Alexander
            <br />
            Cannon
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.22 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-3 sm:mt-20"
          >
            <Button
              link="/projects"
              className="border-ink bg-ink text-paper shadow-[0_1px_0_hsl(var(--ink)/0.25)] hover:bg-accent hover:border-accent hover:text-paper"
            >
              See the work
            </Button>
            <Button
              link="/contact"
              variant="ghost"
              className="border-ink bg-paper text-ink shadow-[0_1px_0_hsl(var(--ink)/0.15)] hover:bg-accent hover:border-accent hover:text-paper"
            >
              Say hello
            </Button>
          </motion.div>
        </div>
      </Vista>

      {/* Solid parchment — sits close under the released sticky hero */}
      <div className="relative z-20 -mt-20 bg-background sm:-mt-28">
        <div ref={trailRef} className="relative mx-auto w-full max-w-shell">
          <ScrollTrail containerRef={trailRef} />
          <PageShell className="relative z-[1] pb-12 pt-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-12">
          <Section className="border-t-0 pt-0">
            <SectionLabel reduced={reduced}>Field kit</SectionLabel>
            <ContourRule />
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 sm:gap-x-8">
              {languages.map((lang) => (
                <motion.li
                  key={lang}
                  variants={fadeUp}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="engraved font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-none tracking-tight text-ink"
                >
                  {lang}
                </motion.li>
              ))}
            </ul>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg"
            >
              {tools.map((tool, i) => (
                <motion.span
                  key={tool}
                  initial={reduced ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={viewport}
                  transition={{ delay: 0.15 + i * 0.04, duration: 0.35 }}
                >
                  {i > 0 ? " · " : ""}
                  {tool}
                </motion.span>
              ))}
            </motion.p>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted"
            >
              Last ship ·{" "}
              <Link
                href={`/projects/${latest.slug}`}
                className="text-accent underline decoration-dashed underline-offset-4 hover:underline"
              >
                {latest.title}
              </Link>
            </motion.p>
          </Section>

          {desktop && (
            <Section className="mt-16 border-t border-dashed border-line pt-12 lg:mt-20 lg:pt-16">
              <SectionLabel reduced={reduced}>Field radio</SectionLabel>
              <ContourRule />
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mt-6 h-[28rem] max-w-3xl"
              >
                <HomeTerminalPanel />
              </motion.div>
            </Section>
          )}

          <Section
            id="about"
            className="mt-16 scroll-mt-24 border-t border-dashed border-line pt-12 lg:mt-20 lg:pt-16"
          >
            <SectionLabel reduced={reduced}>Dossier</SectionLabel>
            <ContourRule />
            <div className="mt-8 grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-start md:gap-16">
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-measure space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg"
              >
                <p>
                  I have spent most of my career in the places where software
                  meets real weather – Discovery&apos;s early live streaming,
                  regulated fintech, blockchain experiments, LLM tools that have
                  to survive production data and a grudge. The job description
                  always said implement and deliver. The actual work was taking
                  ambiguity and bad incentives and somehow producing something
                  sturdy enough that other people could stand on it.
                </p>
                <p>
                  These days I split time between shipping my own products and
                  the unglamorous leadership work: noticing the wobble before
                  anyone else does, keeping architecture honest, writing for the
                  next person – including future me, who will be tired and
                  annoyed.
                </p>
                <p>
                  Away from the keyboard: strings, early miles, trails, foreign
                  sidewalks, unread spines, and a bike that folds into luggage.
                </p>
              </motion.div>
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.08 }}
                className="photo-corners relative aspect-[4/5] max-w-md overflow-hidden md:max-w-none"
              >
                <Image
                  src="/images/working.png"
                  alt="Alexander at work"
                  fill
                  className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
              </motion.div>
            </div>
          </Section>

          <Section className="mt-16 border-t border-dashed border-line pt-12 lg:mt-20 lg:pt-16">
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="engraved font-display text-3xl tracking-tight text-ink"
            >
              How I work
            </motion.h2>
            <ContourRule />
            <ul className="mt-6 max-w-measure space-y-3 text-base leading-relaxed text-ink-muted sm:text-lg">
              {[
                "Small teams, clear ownership",
                "Ship incremental, keep the joinery honest",
                "Boring tech when it wins",
                "Write for the next person – including future me",
              ].map((item, i) => (
                <motion.li
                  key={item}
                  variants={fadeUp}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex items-start gap-3"
                >
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>
                    <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </Section>

          <Section className="mt-16 border-t border-dashed border-line pt-10 lg:mt-20">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <SectionLabel reduced={reduced}>Expedition log</SectionLabel>
                <ContourRule />
              </div>
              <motion.div variants={fadeUp}>
                <Link
                  href="/experience"
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent underline decoration-dashed underline-offset-4 hover:underline"
                >
                  Full timeline
                </Link>
              </motion.div>
            </div>
            <ul className="relative mt-6 divide-y divide-dashed divide-line border-b border-dashed border-line">
              <motion.div
                aria-hidden
                className="absolute left-0 top-5 hidden h-[calc(100%-2.5rem)] w-px bg-line/80 sm:block"
                initial={reduced ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={viewport}
                transition={{ duration: 0.7, ease: "easeOut" }}
                style={{ originY: 0 }}
              />
              {selectedRoles.map((role) => (
                <motion.li
                  key={`${role.company}-${role.period}`}
                  variants={fadeUp}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:pl-5"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-[1.85rem] hidden h-2 w-2 -translate-x-1/2 rounded-full border border-accent bg-paper sm:block"
                  />
                  <div>
                    <p className="engraved font-display text-2xl tracking-tight text-ink sm:text-3xl">
                      {role.company}
                    </p>
                    <p className="mt-1 text-sm text-ink-muted sm:text-base">
                      {role.title}
                    </p>
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted sm:text-right">
                    {role.period}
                  </p>
                </motion.li>
              ))}
            </ul>
          </Section>

          <Section className="mt-16 border-t border-dashed border-line pt-10 lg:mt-20">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <SectionLabel reduced={reduced}>Recent work</SectionLabel>
                <ContourRule />
              </div>
              <motion.div variants={fadeUp}>
                <Link
                  href="/projects"
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent underline decoration-dashed underline-offset-4 hover:underline"
                >
                  See more
                </Link>
              </motion.div>
            </div>
            <ul className="mt-6 space-y-4">
              {featured.map((item, index) => (
                <motion.li
                  key={item.title}
                  variants={fadeUp}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  whileHover={reduced ? undefined : { x: 4 }}
                >
                  <Link
                    href={item.href}
                    className="ticket group flex flex-col gap-1 px-4 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                  >
                    <span className="engraved font-display text-2xl tracking-tight text-ink sm:text-3xl">
                      <span className="stamp mr-3 align-middle">
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
          </Section>

          {substack && (
            <Section className="mt-16 border-t border-dashed border-line pt-10 lg:mt-20">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <SectionLabel reduced={reduced}>From Substack</SectionLabel>
                  <ContourRule />
                </div>
                <motion.div variants={fadeUp}>
                  <a
                    href="https://alexandercannon.substack.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent underline decoration-dashed underline-offset-4 hover:underline"
                  >
                    See more
                  </a>
                </motion.div>
              </div>
              <motion.a
                variants={fadeUp}
                transition={{ duration: 0.45, ease: "easeOut" }}
                href={substack.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block engraved font-display text-2xl tracking-tight text-ink sm:text-3xl"
              >
                {substack.title}
              </motion.a>
              {substack.date && (
                <motion.p
                  variants={fadeUp}
                  className="mt-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted"
                >
                  {new Date(substack.date).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </motion.p>
              )}
            </Section>
          )}

          <Section className="mt-16 border-t border-dashed border-line pt-12 lg:mt-20 lg:pt-16">
            <div className="max-w-measure">
              <motion.h2
                variants={fadeUp}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="engraved font-display text-3xl tracking-tight text-ink"
              >
                Away from the keyboard
              </motion.h2>
              <ContourRule />
              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mt-3 text-base leading-relaxed text-ink-muted sm:text-lg"
              >
                Hours that do not ship, and would be missed if they did.
              </motion.p>
            </div>
            <ul className="mt-10 max-w-2xl divide-y divide-dashed divide-line border-y border-dashed border-line">
              {hobbies.map((hobby) => (
                <motion.li
                  key={hobby.name}
                  variants={fadeUp}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="grid grid-cols-[4.5rem_1fr] items-start gap-4 py-6 sm:grid-cols-[5.5rem_1fr] sm:gap-6"
                >
                  <motion.div
                    className="photo-corners relative aspect-square overflow-hidden"
                    whileHover={reduced ? undefined : { scale: 1.04 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <Image
                      src={hobby.image}
                      alt={hobby.name}
                      fill
                      className="object-cover"
                      sizes="88px"
                    />
                  </motion.div>
                  <div>
                    <h3 className="engraved font-display text-xl tracking-tight text-ink sm:text-2xl">
                      {hobby.name}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-ink-muted">
                      {hobby.blurb}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </Section>

          <Section className="mt-16 border-t border-dashed border-line pt-12 lg:mt-20 lg:pt-16">
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex items-start gap-4"
            >
              <motion.svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                aria-hidden
                className="mt-1 shrink-0 text-accent"
                animate={
                  reduced
                    ? undefined
                    : { rotate: [0, 8, -6, 0] }
                }
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.45"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M18 4V32M4 18H32"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M18 8L20.2 16.5L18 15.2L15.8 16.5Z"
                  fill="currentColor"
                />
                <circle cx="18" cy="18" r="1.6" fill="currentColor" />
              </motion.svg>
              <p className="max-w-measure text-lg leading-relaxed text-ink-muted sm:text-xl">
                Open to interesting work. If that sounds like something you are
                building, say hello.
              </p>
            </motion.div>
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm"
            >
              <a
                href={`mailto:${resume.personalInfo.email}`}
                className="text-accent underline decoration-dashed underline-offset-4 hover:underline"
              >
                {resume.personalInfo.email}
              </a>
              <Link
                href="/contact"
                className="text-ink-muted underline-offset-4 hover:text-ink hover:underline"
              >
                Contact
              </Link>
              <Link
                href="/experience"
                className="text-ink-muted underline-offset-4 hover:text-ink hover:underline"
              >
                Experience
              </Link>
              <Link
                href="/print"
                className="text-ink-muted underline-offset-4 hover:text-ink hover:underline"
              >
                Print resume
              </Link>
            </motion.div>
          </Section>
          </PageShell>
        </div>
      </div>
    </>
  );
}
