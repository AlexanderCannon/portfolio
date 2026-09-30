export type Thumb = "phone" | "wide";

export type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  body: string[];
  stack: string[];
  challenges: string[];
  role: "solo" | "shared";
  roleNote?: string;
  image: string;
  github: string | null;
  live: string | null;
  kind: string;
  thumb: Thumb;
};

export const projects: Project[] = [
  {
    id: 9,
    slug: "volume",
    title: "VOLUME",
    description:
      "A reading companion – sessions, shelf, streaks that do not stage a performance about it.",
    body: [
      "I kept losing the thread of what I was reading. Somewhere between the review-shaped apps and the ones that treat a missed day like a moral failure, I wanted somewhere quieter: log a session, see the shelf, know where I left off.",
      "VOLUME does that. Timed reading blocks you can pause when life happens. Pages and pace on the books you are in the middle of. Streaks that celebrate showing up without inventing a personality crisis for Tuesday. Optional social layer – finish a book, hit a milestone – kept optional on purpose.",
    ],
    stack: [
      "Expo / React Native (TypeScript)",
      "Clerk (email OTP + Sign in with Apple)",
      "Supabase Postgres with RLS",
      "Supabase Edge Functions (Deno)",
      "Zustand + TanStack Query",
      "EAS Build / App Store",
    ],
    challenges: [
      "Bridging Clerk session JWTs into Supabase as third-party auth so PostgREST and RLS work without Supabase Auth users.",
      "Draft vs published reading sessions, plus an offline queue that replays end-session payloads when the app returns to the foreground.",
      "SQL trigger fan-out from feed events into a per-user inbox, with book search kept on an edge function so Google Books keys never sit in the binary.",
      "App Store account deactivation and permanent delete across Supabase data and Clerk.",
    ],
    role: "solo",
    image: "/images/volume-app.png",
    github: "https://github.com/AlexanderCannon/volume-reading",
    live: "https://apps.apple.com/us/app/volume-books/id6769268426",
    kind: "App",
    thumb: "phone",
  },
  {
    id: 8,
    slug: "sophias-future-doctor-club",
    title: "Sophia's Future Doctor Club",
    description:
      "Weekly missions, club notes, badges, and streaks for a kid who wants the white coat someday – all on-device.",
    body: [
      "This started for a kid who talks about becoming a doctor the way other kids talk about dinosaurs. I wanted something she would open because it felt like hers.",
      "Each week: small picks across science, math, reading, writing, service. Finish one, jot a Club Note, earn XP and badges. Swap today's pick or log your own when the plan and the day refuse to agree. No account, no ads, no cloud.",
    ],
    stack: [
      "Expo / React Native (TypeScript)",
      "expo-sqlite (local-only)",
      "expo-notifications",
      "Expo Router",
      "EAS Build / App Store",
    ],
    challenges: [
      "Deterministic weekly mission selection: seeded RNG, rank-gated pools, difficulty budgets, and an eight-week template exclusion so the lineup does not repeat itself into boredom.",
      "Versioned SQLite migrations and week-plan invalidation when the catalog or rank at selection changes – without an ORM or a backend.",
      "Shipping a privacy-first kids' app: everything stays on device; notifications only after the user opts in.",
    ],
    role: "solo",
    image: "/images/sophias-future-doctor-club.png",
    github: null,
    live: "https://apps.apple.com/us/app/sophias-future-doctor-club/id6777174145",
    kind: "App",
    thumb: "phone",
  },
  {
    id: 10,
    slug: "honey-do",
    title: "Honey Do",
    description:
      "Family planner with shared calendars, assigned tasks, and a points system for the chore wars.",
    body: [
      "Family logistics are a shared calendar someone forgets to open, a chore list nobody owns, and a recurring chorus of “I thought you were doing that.”",
      "Honey Do is shared calendars, assignable recurring chores, household invites, and a points ledger so the household can finish the boring stuff together. Still cooking, but the shape of it is there.",
    ],
    stack: [
      "Expo / React Native client",
      "Phoenix / Elixir API",
      "PostgreSQL + Ecto",
      "Guardian JWT + Argon2",
      "Oban cron jobs",
      "OpenTelemetry",
    ],
    challenges: [
      "Recurring chores in household local time, stored UTC, with catch-up generation after missed completions.",
      "Calendar series expansion (RRULE, overrides, all-day vs timed) that still makes sense on a phone.",
      "Multi-household auth state on the client, plus Oban jobs for occurrence sweeps and due-soon notifications with quiet hours.",
    ],
    role: "solo",
    image: "/images/honey-do.png",
    github: "https://github.com/AlexanderCannon/honey-do-app",
    live: null,
    kind: "App",
    thumb: "wide",
  },
  {
    id: 11,
    slug: "lllanguage",
    title: "lllanguage",
    description:
      "Language learning from the gaps in real conversation – speak, catch what you needed, bring it back later.",
    body: [
      "Most language apps teach phrases you will never say. Real conversation is messier – you need a word mid-sentence, stay quiet, and forget to look it up later.",
      "lllanguage is built around that gap. Speak with a partner, catch what you needed in the moment, bring it back when you have time. The vocabulary that actually showed up in your life.",
    ],
    stack: [
      "Expo / React Native (audio streaming)",
      "Fastify + WebSocket server",
      "PostgreSQL",
      "Local ASR / TTS / Ollama adapters",
      "Next.js marketing + store pages",
    ],
    challenges: [
      "Continuous PCM over WebSocket from a mobile client that cannot stream raw frames through Expo's stock recorder.",
      "Realtime speak path: partial ASR, adaptive endpointing, barge-in, and stripping partner TTS echo from the learner's transcript.",
      "A deterministic pedagogy reducer that owns durable conversation policy while the LLM proposes actions – so the model does not quietly rewrite the lesson.",
      "A local Docker inference path so a pilot can run without burning a hosted model budget.",
    ],
    role: "solo",
    image: "/images/lllanguage.png",
    github: "https://github.com/AlexanderCannon/lllanguage-web",
    live: "https://lllanguage.com/",
    kind: "App",
    thumb: "wide",
  },
  {
    id: 12,
    slug: "pathranger",
    title: "PathRanger",
    description:
      "Rust CLI that remembers where you work and jumps you there – tags, recents, fuzzy search.",
    body: [
      "I spend more time jumping between project folders than I would like to admit. Bookmarks help until you have forty of them. Tab-complete helps until the path is six directories deep and you mistype the third.",
      "PathRanger remembers where you work. Tags, recents, fuzzy search – pick a place and land there. Once it is in your shell, Monday mornings involve a lot less typing the same path twice.",
    ],
    stack: [
      "Rust",
      "SQLite (rusqlite)",
      "Skim fuzzy matcher",
      "bash / zsh / fish init hooks",
    ],
    challenges: [
      "Wrapping `cd` in bash, zsh, and fish without breaking return codes or feeling invasive.",
      "A `goto` stdout contract the shell wrapper can capture, so tags jump you without a second process language.",
      "Fuzzy search over the visit database with sensible ranking for day-to-day use.",
    ],
    role: "solo",
    image: "/images/pathranger.png",
    github: "https://github.com/AlexanderCannon/pathranger",
    live: null,
    kind: "CLI",
    thumb: "wide",
  },
  {
    id: 13,
    slug: "cacheclip",
    title: "CacheClip",
    description:
      "Clipboard history for the terminal – silent capture, fuzzy search, restore without leaving the shell.",
    body: [
      "I kept losing the token I copied three commands ago. Clipboard managers are fine until you live in the terminal and do not want another floating window.",
      "CacheClip watches quietly, keeps a history, and lets you fuzzy-search and restore without leaving the shell.",
    ],
    stack: [
      "Rust",
      "Clipboard crate + Skim fuzzy matcher",
      "JSON history on disk",
      "GitHub Actions multi-OS releases",
    ],
    challenges: [
      "Cross-platform clipboard access and packaging for linux / macOS / Windows on x86_64 and arm64.",
      "A quiet daemon that polls, dedupes consecutive copies, and caps history without needing a GUI.",
    ],
    role: "solo",
    image: "/images/cacheclip.png",
    github: "https://github.com/AlexanderCannon/cacheclip",
    live: "https://github.com/AlexanderCannon/cacheclip/releases",
    kind: "CLI",
    thumb: "wide",
  },
  {
    id: 7,
    slug: "eurovision-party",
    title: "Eurovision Party",
    description:
      "Live voting for Eurovision nights – parties, scores, and a leaderboard that survives the interval act.",
    body: [
      "Eurovision nights are better with a room full of opinions and somewhere to put the scores before the interval act ends.",
      "Private rooms, drag-and-drop voting, a real-time leaderboard, official-style points. Pull it up next May and invite whoever is watching with you.",
    ],
    stack: [
      "Expo / React Native",
      "Supabase Postgres + Realtime",
      "Reanimated sortable voting UI",
      "EAS Build / App Store",
    ],
    challenges: [
      "Supabase Realtime on vote rows that needed replica identity and stable upsert IDs – otherwise the leaderboard goes quiet mid-show.",
      "Reordering a filtered semi-final subset without destroying the full ballot ranks underneath.",
      "Client-side contest phase filters (semi / final / NQ) driven by wall-clock show times, plus platform-split lyrics and points UX.",
    ],
    role: "solo",
    image: "/images/eurovision-party.png",
    github: "https://github.com/alexandercannon/eurovision.fun",
    live: "https://www.eurovision.fun",
    kind: "App",
    thumb: "phone",
  },
  {
    id: 4,
    slug: "guitar-visualizer",
    title: "Guitar Visualizer",
    description:
      "Mobile guitar chords and scales with a fretboard you can actually read under your fingers.",
    body: [
      "I play guitar badly and learn better when I can see the fretboard.",
      "Chords, scales, and voicings mapped onto a phone-sized neck – CAGED shapes, jazz voicings, muted strings included. Built for practice, for the same reason a good instrument can briefly convince you that you sound like someone else.",
    ],
    stack: [
      "Next.js (App Router)",
      "TypeScript",
      "Interactive fretboard UI (client)",
      "Tailwind",
    ],
    challenges: [
      "Turning music theory into geometry: movable voicings, relative frets, muted strings, and multiple tunings in one React neck component that still fits a phone.",
    ],
    role: "solo",
    image: "/images/guitar-visualiser.png",
    github: "https://github.com/alexandercannon/guitarvisualizer",
    live: "https://guitarvisualizer.com",
    kind: "App",
    thumb: "wide",
  },
  {
    id: 3,
    slug: "plannet",
    title: "Plannet.dev",
    description:
      "LLM-powered CLI that spins up and manages ticketing systems – Jira, Slack, less copy-paste.",
    body: [
      "Ticket systems eat half a day if you let them. Copying context into Jira, pinging Slack, updating the same three fields in three places.",
      "Plannet is a terminal-first assistant for that surface: LLM generation, optional Jira flows, and work tracking that attaches git context when you are already in a repo. BYO model or the hosted proxy.",
    ],
    stack: [
      "Go (Cobra CLI)",
      "Go Chi API proxy",
      "PostgreSQL + Redis",
      "Gemini via hosted /v1/query",
      "Goreleaser",
    ],
    challenges: [
      "Jira REST flows with validation and rate limits, plus `plannet track` that persists non-git work and attaches branch, commit, and changed files when cwd is a repo.",
      "Two LLM client shapes (completions vs chat) aimed at the same product surface.",
      "Hosted API keys (`pk_…`) verified with bcrypt, cache-aside in Redis, and usage recorded against the proxy.",
    ],
    role: "solo",
    image: "/images/plannet.png",
    github: "https://github.com/plannet-ai/plannet",
    live: "https://www.plannet.dev/",
    kind: "Tool",
    thumb: "wide",
  },
  {
    id: 2,
    slug: "koi-cd",
    title: "Koi CD",
    description:
      "Concourse-as-a-service – automate delivery pipelines without babysitting the machinery.",
    body: [
      "Delivery pipelines are great until you are the person babysitting Concourse. Koi CD was our answer at Farpoint: Concourse-as-a-service so teams could ship without owning every piece of the machinery.",
      "The interesting part was the product shape – make the hard ops layer feel like a service someone else keeps healthy, so engineers can stay on the pipeline definition.",
    ],
    stack: ["Go", "Concourse"],
    challenges: [
      "Productizing an ops layer so teams own pipeline definitions, not the cluster underneath them.",
    ],
    role: "shared",
    roleNote: "Built with the Farpoint Labs crew.",
    image: "/images/koi-cd.png",
    github: "https://github.com/farpointlabs/koi-cd",
    live: "http://farpointlabs.com",
    kind: "Tool",
    thumb: "wide",
  },
  {
    id: 5,
    slug: "infraedge",
    title: "Infraedge",
    description:
      "Cloud resources as a graph – architecture you can actually look at.",
    body: [
      "Cloud consoles are a maze of tabs. You know the architecture in your head; the UI makes you rediscover it every time you open a new service.",
      "Infraedge was an experiment in making infrastructure feel declarative and visible: a Go CLI with plan/state against AWS, starting as an S3-shaped proof of concept.",
    ],
    stack: [
      "Go",
      "AWS SDK",
      "Declarative plan / state CLI",
    ],
    challenges: [
      "A minimal plan engine that diffs desired config against JSON state, with an early provider abstraction over AWS.",
    ],
    role: "shared",
    roleNote: "Built with the Farpoint Labs crew.",
    image: "/images/infraedge.png",
    github: "https://github.com/alexandercannon/infraedge",
    live: "https://www.infraedge.dev",
    kind: "Tool",
    thumb: "wide",
  },
  {
    id: 6,
    slug: "scratcher",
    title: "Scratcher",
    description:
      "A creator publishing app – articles, roles, comments, and the social bits around a post.",
    body: [
      "Scratcher started in a stretch when I was deep in crypto and curious whether creators could own distribution. The curiosity was useful. What shipped is a more boring and honest stack.",
      "Articles with roles, comments, stars, follows, and image uploads – a T3-style publisher you can actually click. Ambitious earlier ideas about ledgers did not survive contact with shipping something people could use.",
    ],
    stack: [
      "Next.js + tRPC",
      "Prisma",
      "NextAuth",
      "Cloudinary + sharp",
    ],
    challenges: [
      "Role-gated procedures (contributor / editor / admin) around a full article CMS with cursor pagination.",
      "Image pipeline: client upload through sharp resize into Cloudinary without turning every post into a binary blob in the DB.",
    ],
    role: "solo",
    image: "/images/scratcher.png",
    github: "https://github.com/alexandercannon/scratcher",
    live: "https://www.scratcher.zone",
    kind: "Web",
    thumb: "wide",
  },
  {
    id: 1,
    slug: "this-site",
    title: "This site",
    description:
      "The portfolio you are on – Next.js, occasional redesigns, and whatever I am shipping next.",
    body: [
      "This is the portfolio you are on. Next.js, older notes that still live here, project writeups, and the occasional redesign when the previous look starts to feel like someone else's taste.",
      "It doubles as a sandbox. New UI ideas, a terminal on the home page, app privacy pages that need a real URL for the stores – they all land here first.",
    ],
    stack: [
      "Next.js 15 (App Router)",
      "tRPC + TanStack Query",
      "Drizzle ORM + Postgres",
      "Tailwind + Framer Motion",
    ],
    challenges: [
      "Keeping a typed static project catalog as the source of truth while also hosting App Store landing pages, contact, and a Postgres-backed blog.",
      "Editorial redesign without a CMS – voice and layout have to stay coherent across a decade of side projects.",
    ],
    role: "solo",
    image: "/images/portfolio.png",
    github: "https://github.com/alexandercannon/portfolio",
    live: "https://www.alexandercannon.dev",
    kind: "Web",
    thumb: "wide",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function liveLabel(url: string) {
  if (url.includes("apps.apple.com")) return "App Store";
  if (url.includes("github.com") && url.includes("releases")) return "Releases";
  return "Open";
}

export function roleLabel(project: Project) {
  if (project.role === "solo") {
    return "Solo — design, code, and shipping.";
  }
  return project.roleNote
    ? `Shared project. ${project.roleNote}`
    : "Shared project.";
}
