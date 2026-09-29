export type Thumb = "phone" | "wide";

export type Project = {
  id: number;
  slug: string;
  title: string;
  description: string;
  body: string[];
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
      "VOLUME does that. Timed reading blocks you can pause when life happens. Pages and pace on the books you are in the middle of. Streaks that celebrate showing up without inventing a personality crisis for Tuesday.",
      "There is a small social layer if you want it – finish a book, hit a milestone – kept optional on purpose. Accounts via Clerk, reading data in a Supabase workspace tied to your account, book search on the server so keys never live in the binary.",
    ],
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
      "Each week: small picks across science, math, reading, writing, service – fifteen to thirty minutes. Finish one, jot a Club Note, earn XP and badges that never reset. Swap today's pick or log your own when the plan and the day refuse to agree.",
      "No account, no ads, no cloud. Name, picks, and notes stay on the device. Reminders only ask for notification permission when you turn them on.",
    ],
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
      "Honey Do is shared calendars, assigned tasks, and a points system so the household can finish the boring stuff together. Still cooking, but the shape of it is there.",
    ],
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
      "lllanguage is built around that gap. Speak, catch what you needed in the moment, bring it back when you have time. The vocabulary that actually showed up in your life.",
    ],
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
      "PathRanger is a small Rust CLI that remembers where you work. Tags, recents, fuzzy search – pick a place and land there. Once it is in your shell, Monday mornings involve a lot less typing the same path twice.",
    ],
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
      "Private rooms, drag-and-drop voting, a real-time leaderboard, official points. Pull it up next May and invite whoever is watching with you.",
    ],
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
      "Mobile guitar chords and scales with a real-time visualizer for notes under your fingers.",
    body: [
      "I play guitar badly and learn better when I can see the fretboard.",
      "Chords and scales on a phone, with a real-time view of the notes under your fingers. Built for practice, for the same reason a good instrument can briefly convince you that you sound like someone else.",
    ],
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
      "Plannet is an LLM-powered CLI for that surface. Aimed at people who already live in a terminal and would rather stay there.",
    ],
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
      "The interesting part was the product shape – make the hard ops layer feel like a service someone else keeps healthy, so engineers can stay on the pipeline definition. Built with the Farpoint Labs crew.",
    ],
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
      "Infraedge puts resources on a graph so you can see how things connect and manage them from that view. An experiment in making infrastructure feel visual.",
    ],
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
      "Blockchain publishing for creators who want to own distribution – IPFS, Ethereum, the whole stack.",
    body: [
      "Scratcher came from a stretch when I was deep in crypto and curious whether creators could own their own distribution.",
      "IPFS for content, Ethereum for the bits that needed a ledger, a web app around it. Ambitious, a little messy, very much of its moment. I would not claim it changed publishing. It was a useful way to learn the hard edges of that stack by shipping something people could click.",
    ],
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
      "It doubles as a sandbox. New UI ideas, a terminal on the home page, app privacy pages that need a real URL for the stores – they all land here first. The current pass is quieter typography and a page for each project.",
    ],
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
