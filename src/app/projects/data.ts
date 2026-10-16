export type Thumb = "phone" | "wide";
export type ShipStatus = "shipped" | "cooking";

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
  status: ShipStatus;
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
      "A reading app for logging sessions, tracking books, and sharing progress.",
    body: [
      "I wanted a way to track what I was reading and where I had left off, so I built VOLUME.",
      "You can time and pause reading sessions, record pages, and keep a shelf of books. It also tracks streaks and lets you share finished books and milestones with friends.",
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
    status: "shipped",
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
      "Weekly activities and a journal for kids interested in medicine. Everything stays on the device.",
    body: [
      "I built this for a kid who wants to become a doctor, with activities she could do each week and a place to write about them.",
      "Each week includes activities in science, math, reading, writing, and service. Kids can write Club Notes, earn XP and badges, swap activities, or add their own. There are no accounts or ads, and data is stored locally.",
    ],
    stack: [
      "Expo / React Native (TypeScript)",
      "expo-sqlite (local-only)",
      "expo-notifications",
      "Expo Router",
      "EAS Build / App Store",
    ],
    challenges: [
      "Deterministic weekly mission selection: seeded RNG, rank-gated pools, difficulty budgets, and an eight-week template exclusion to avoid repeating recent activities.",
      "Versioned SQLite migrations and week-plan invalidation when the catalog or rank at selection changes – without an ORM or a backend.",
      "Shipping a privacy-first kids' app: everything stays on device; notifications only after the user opts in.",
    ],
    role: "solo",
    status: "shipped",
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
      "A family planner with shared calendars, recurring chores, and household points.",
    body: [
      "Honey Do brings household calendars and chores into one app, with tasks assigned to individual family members.",
      "It supports recurring chores, household invites, and a points ledger. The app is still in development.",
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
    status: "cooking",
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
      "A language practice app that saves vocabulary from conversations for later review.",
    body: [
      "When you need a word during a conversation, it is easy to forget to look it up afterwards. I am building lllanguage to capture those moments.",
      "The app combines spoken practice with vocabulary review, using words from your conversations. It is still in development.",
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
      "Keeping lesson state and conversation rules in a deterministic reducer, with the LLM proposing actions for the reducer to validate.",
      "Running speech and language models locally in Docker to test without hosted inference costs.",
    ],
    role: "solo",
    status: "cooking",
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
      "I built PathRanger to spend less time typing paths when switching between projects.",
      "It keeps a history of visited directories and lets you find them with tags or fuzzy search. Shell hooks handle the directory change in bash, zsh, and fish.",
    ],
    stack: [
      "Rust",
      "SQLite (rusqlite)",
      "Skim fuzzy matcher",
      "bash / zsh / fish init hooks",
    ],
    challenges: [
      "Wrapping `cd` in bash, zsh, and fish while preserving exit codes and normal shell behaviour.",
      "Returning the selected path on stdout so the shell wrapper can change the current directory.",
      "Fuzzy search over the visit database with sensible ranking for day-to-day use.",
    ],
    role: "solo",
    status: "shipped",
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
    status: "shipped",
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
      "Private Eurovision voting rooms with shared scores and a live leaderboard.",
    body: [
      "I built Eurovision Party for watching and scoring the contest with friends.",
      "Create a private room, invite friends, and rank the songs by dragging them into order. Votes update a shared leaderboard using Eurovision-style points.",
    ],
    stack: [
      "Expo / React Native",
      "Supabase Postgres + Realtime",
      "Reanimated sortable voting UI",
      "EAS Build / App Store",
    ],
    challenges: [
      "Supabase Realtime on vote rows that needed replica identity and stable upsert IDs – to keep leaderboard updates flowing.",
      "Reordering a filtered semi-final subset without destroying the full ballot ranks underneath.",
      "Client-side contest phase filters (semi / final / NQ) driven by wall-clock show times, plus platform-split lyrics and points UX.",
    ],
    role: "solo",
    status: "shipped",
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
      "An interactive guitar fretboard for exploring chords, scales, and voicings on your phone.",
    body: [
      "I play guitar badly and learn better when I can see the fretboard.",
      "The app maps chords, scales, and voicings onto an interactive fretboard. It includes CAGED shapes, jazz voicings, muted strings, and multiple tunings, with a layout that fits a phone.",
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
    status: "shipped",
    image: "/images/guitar-visualiser.png",
    github: "https://github.com/alexandercannon/guitarvisualizer",
    live: "https://guitarvisualizer.com",
    kind: "App / Web",
    thumb: "wide",
  },
  {
    id: 3,
    slug: "plannet",
    title: "Plannet.dev",
    description:
      "A CLI for generating tickets and tracking work with Jira and Git context.",
    body: [
      "I built Plannet to create tickets and track work from the terminal, using context from the current repository.",
      "It uses an LLM to generate content, supports Jira workflows, and attaches branch, commit, and file changes to work records. You can use your own model or the hosted proxy.",
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
      "Supporting both completion and chat model APIs through the same CLI commands.",
      "Hosted API keys (`pk_…`) verified with bcrypt, cache-aside in Redis, and usage recorded against the proxy.",
    ],
    role: "solo",
    status: "shipped",
    image: "/images/plannet.png",
    github: "https://github.com/plannet-ai/plannet",
    live: "https://www.plannet.dev/",
    kind: "CLI",
    thumb: "wide",
  },
  {
    id: 2,
    slug: "koi-cd",
    title: "Koi CD",
    description:
      "Hosted Concourse CI with a CLI and web interface for managing delivery pipelines.",
    body: [
      "At Farpoint Labs, we built Koi CD to offer Concourse as a hosted service.",
      "Teams could define their delivery pipelines while we managed the underlying Concourse infrastructure. The product included CLI tools and a web interface.",
    ],
    stack: ["Go", "Concourse"],
    challenges: [
      "Separating customer pipeline configuration from the operation of the hosted Concourse clusters.",
    ],
    role: "shared",
    roleNote: "Built with the team at Farpoint Labs.",
    status: "shipped",
    image: "/images/koi-cd.png",
    github: "https://github.com/farpointlabs/koi-cd",
    live: "http://farpointlabs.com",
    kind: "CLI / Web",
    thumb: "wide",
  },
  {
    id: 5,
    slug: "infraedge",
    title: "Infraedge",
    description:
      "An experimental Go CLI for planning AWS infrastructure changes.",
    body: [
      "Infraedge explored defining AWS resources in configuration and comparing them with stored state before making changes.",
      "The proof of concept focused on S3, with a Go CLI, a plan engine, and an initial AWS provider abstraction.",
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
    roleNote: "Built with the team at Farpoint Labs.",
    status: "shipped",
    image: "/images/infraedge.png",
    github: "https://github.com/alexandercannon/infraedge",
    live: "https://www.infraedge.dev",
    kind: "CLI",
    thumb: "wide",
  },
  {
    id: 6,
    slug: "scratcher",
    title: "Scratcher",
    description:
      "A publishing app with articles, editorial roles, comments, and follows.",
    body: [
      "Scratcher began as an experiment in creator-owned distribution while I was working on crypto projects. I later narrowed it to a publishing app.",
      "It supports articles, contributor and editor roles, comments, stars, follows, and image uploads. The earlier ledger ideas were dropped from the implementation.",
    ],
    stack: [
      "Next.js + tRPC",
      "Prisma",
      "NextAuth",
      "Cloudinary + sharp",
    ],
    challenges: [
      "Role-gated procedures (contributor / editor / admin) around a full article CMS with cursor pagination.",
      "Image pipeline: client upload through sharp resize into Cloudinary while keeping image files out of the database.",
    ],
    role: "solo",
    status: "shipped",
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
      "My portfolio, project writeups, and blog archive, built with Next.js.",
    body: [
      "I use this site to share projects, keep an archive of earlier writing, and provide a printable resume.",
      "It is also where I try UI ideas, including the homepage terminal, and host support and privacy pages for my apps.",
    ],
    stack: [
      "Next.js 15 (App Router)",
      "tRPC + TanStack Query",
      "Drizzle ORM + Postgres",
      "Tailwind + Framer Motion",
    ],
    challenges: [
      "Keeping a typed static project catalog as the source of truth while also hosting App Store landing pages, contact, and a Postgres-backed blog.",
      "Updating shared layouts and project copy directly in the codebase, without a CMS.",
    ],
    role: "solo",
    status: "shipped",
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
    return "I designed, built, and released it.";
  }
  return project.roleNote
    ? `Shared project. ${project.roleNote}`
    : "Shared project.";
}

export function plateNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

export const projectKinds = ["All", "App", "CLI", "Web"] as const;

