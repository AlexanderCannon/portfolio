"use client";

import Image from "next/image";
import PageShell from "~/app/_components/ui/page-shell";

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

export default function AboutPage() {
  return (
    <PageShell>
      <header className="max-w-2xl">
        <p className="font-label text-accent">About</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tighter text-ink sm:text-5xl">
          Alexander Cannon
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">
          Engineering leader and founder. I build things people come back to –
          products with a bit of weight underfoot.
        </p>
        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <a
            href="mailto:alexander@farpointlabs.com"
            className="text-accent underline-offset-4 hover:underline"
          >
            Email
          </a>
          <a
            href="https://github.com/AlexanderCannon"
            className="text-ink-muted underline-offset-4 hover:text-ink hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/alexandermcannon"
            className="text-ink-muted underline-offset-4 hover:text-ink hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="https://alexandercannon.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-muted underline-offset-4 hover:text-ink hover:underline"
          >
            Substack
          </a>
        </div>
      </header>

      <div className="mt-14 grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:gap-16">
        <div className="space-y-6 text-base leading-relaxed text-ink-muted sm:text-lg">
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

        <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-secondary">
          <Image
            src="/images/working.png"
            alt="Alexander at work"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      </div>

      <section className="mt-20 border-t-2 border-ink pt-12">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
          What I reach for
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="font-label text-ink-muted">Stack</h3>
            <ul className="mt-3 space-y-2 text-ink-muted">
              <li>TypeScript, Rust, Python, Go</li>
              <li>React, React Native, Expo, Next.js</li>
              <li>AWS, Azure, GCP</li>
              <li>Postgres, Redis, Kafka</li>
              <li>LLMs where the pager still rings</li>
            </ul>
          </div>
          <div>
            <h3 className="font-label text-ink-muted">How I work</h3>
            <ul className="mt-3 space-y-2 text-ink-muted">
              <li>Small teams, clear ownership</li>
              <li>Ship incremental, keep the joinery honest</li>
              <li>Boring tech when it wins</li>
              <li>Write for the next person – including future me</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-20 border-t-2 border-ink pt-12">
        <div className="max-w-measure">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
            Away from the keyboard
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-muted sm:text-lg">
            Hours that do not ship, and would be missed if they did.
          </p>
        </div>

        <ul className="mt-10 max-w-2xl divide-y divide-line border-y border-line">
          {hobbies.map((hobby) => (
            <li
              key={hobby.name}
              className="grid grid-cols-[4.5rem_1fr] items-start gap-4 py-6 sm:grid-cols-[5.5rem_1fr] sm:gap-6"
            >
              <div className="relative aspect-square overflow-hidden rounded-md bg-secondary">
                <Image
                  src={hobby.image}
                  alt={hobby.name}
                  fill
                  className="object-cover"
                  sizes="88px"
                />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
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
    </PageShell>
  );
}
