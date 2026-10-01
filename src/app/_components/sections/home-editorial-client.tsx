"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import PageShell from "~/app/_components/ui/page-shell";
import Button from "~/app/_components/ui/button";
import Vista from "~/app/_components/ui/vista";
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

export default function HomeEditorialClient({
  substack,
}: {
  substack: SubstackPost | null;
}) {
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
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.14 }}
            className="mx-auto mt-5 max-w-sm text-base leading-relaxed text-[hsl(var(--vista-text-muted))]"
          >
            Products people come back to — apps, tools, and experiments.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.22 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-4"
          >
            <Button
              link="/projects"
              className="border-0 bg-[hsl(var(--vista-text))] text-[hsl(var(--vista-sky-bottom))] hover:bg-stamp hover:text-paper"
            >
              See the work
            </Button>
            <Button
              link="/contact"
              variant="link"
              className="text-[hsl(var(--vista-text))]"
            >
              Say hello
            </Button>
          </motion.div>
        </div>
      </Vista>

      {/* Solid parchment — sits close under the released sticky hero */}
      <div className="relative z-20 -mt-20 bg-background sm:-mt-28">
        <PageShell className="bg-background pb-12 pt-8 sm:pb-16 sm:pt-10 lg:pb-20 lg:pt-12">
          <section className="border-t-0 pt-0">
            <p className="font-label text-ink-muted">Field kit</p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 sm:gap-x-8">
              {languages.map((lang) => (
                <li
                  key={lang}
                  className="engraved font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-none tracking-tight text-ink"
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
                className="text-accent underline decoration-dashed underline-offset-4 hover:underline"
              >
                {latest.title}
              </Link>
            </p>
          </section>

          {desktop && (
            <section className="mt-16 border-t border-dashed border-line pt-12 lg:mt-20 lg:pt-16">
              <p className="font-label text-ink-muted">Field radio</p>
              <div className="mt-6 h-[28rem] max-w-3xl">
                <HomeTerminalPanel />
              </div>
            </section>
          )}

          <section
            id="about"
            className="mt-16 scroll-mt-24 border-t border-dashed border-line pt-12 lg:mt-20 lg:pt-16"
          >
            <p className="font-label text-ink-muted">Dossier</p>
            <div className="mt-8 grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-start md:gap-16">
              <div className="max-w-measure space-y-5 text-base leading-relaxed text-ink-muted sm:text-lg">
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
              </div>
              <div className="photo-corners relative aspect-[4/5] max-w-md overflow-hidden md:max-w-none">
                <Image
                  src="/images/working.png"
                  alt="Alexander at work"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority
                />
              </div>
            </div>
          </section>

          <section className="mt-16 border-t border-dashed border-line pt-12 lg:mt-20 lg:pt-16">
            <h2 className="engraved font-display text-3xl tracking-tight text-ink">
              How I work
            </h2>
            <ul className="mt-6 max-w-measure space-y-3 text-base leading-relaxed text-ink-muted sm:text-lg">
              <li>Small teams, clear ownership</li>
              <li>Ship incremental, keep the joinery honest</li>
              <li>Boring tech when it wins</li>
              <li>Write for the next person – including future me</li>
            </ul>
          </section>

          <section className="mt-16 border-t border-dashed border-line pt-10 lg:mt-20">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="font-label text-ink-muted">Expedition log</p>
              <Link
                href="/experience"
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent underline decoration-dashed underline-offset-4 hover:underline"
              >
                Full timeline
              </Link>
            </div>
            <ul className="mt-6 divide-y divide-dashed divide-line border-b border-dashed border-line">
              {selectedRoles.map((role) => (
                <li
                  key={`${role.company}-${role.period}`}
                  className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
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
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-16 border-t border-dashed border-line pt-10 lg:mt-20">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="font-label text-ink-muted">Recent work</p>
              <Link
                href="/projects"
                className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent underline decoration-dashed underline-offset-4 hover:underline"
              >
                See more
              </Link>
            </div>
            <ul className="mt-6 space-y-4">
              {featured.map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                    delay: index * 0.06,
                  }}
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
          </div>

          {substack && (
            <div className="mt-16 border-t border-dashed border-line pt-10 lg:mt-20">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <p className="font-label text-ink-muted">From Substack</p>
                <a
                  href="https://alexandercannon.substack.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent underline decoration-dashed underline-offset-4 hover:underline"
                >
                  See more
                </a>
              </div>
              <a
                href={substack.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block engraved font-display text-2xl tracking-tight text-ink sm:text-3xl"
              >
                {substack.title}
              </a>
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
          )}

          <section className="mt-16 border-t border-dashed border-line pt-12 lg:mt-20 lg:pt-16">
            <div className="max-w-measure">
              <h2 className="engraved font-display text-3xl tracking-tight text-ink">
                Away from the keyboard
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink-muted sm:text-lg">
                Hours that do not ship, and would be missed if they did.
              </p>
            </div>
            <ul className="mt-10 max-w-2xl divide-y divide-dashed divide-line border-y border-dashed border-line">
              {hobbies.map((hobby) => (
                <li
                  key={hobby.name}
                  className="grid grid-cols-[4.5rem_1fr] items-start gap-4 py-6 sm:grid-cols-[5.5rem_1fr] sm:gap-6"
                >
                  <div className="photo-corners relative aspect-square overflow-hidden">
                    <Image
                      src={hobby.image}
                      alt={hobby.name}
                      fill
                      className="object-cover"
                      sizes="88px"
                    />
                  </div>
                  <div>
                    <h3 className="engraved font-display text-xl tracking-tight text-ink sm:text-2xl">
                      {hobby.name}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-ink-muted">
                      {hobby.blurb}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16 border-t border-dashed border-line pt-12 lg:mt-20 lg:pt-16">
            <p className="max-w-measure text-lg leading-relaxed text-ink-muted sm:text-xl">
              Open to interesting work. If that sounds like something you are
              building, say hello.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
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
            </div>
          </section>
        </PageShell>
      </div>
    </>
  );
}
