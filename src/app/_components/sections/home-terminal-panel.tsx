"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { projects } from "~/app/projects/data";

interface HistoryEntry {
  type: "command" | "output";
  content: string;
  muted?: boolean;
}

type CommandFn = (args?: string[]) => string[] | "CLEAR" | "NAV";

const WELCOME: HistoryEntry[] = [
  {
    type: "output",
    content: "Alexander Cannon — terminal",
  },
  {
    type: "output",
    content: 'Type "help". Press / anywhere to focus. Arrow keys for history.',
    muted: true,
  },
  { type: "output", content: "" },
];

const NAV: Record<string, string> = {
  volume: "/projects/volume",
  sophia: "/projects/sophias-future-doctor-club",
  "sophias-future-doctor-club": "/projects/sophias-future-doctor-club",
  honey: "/projects/honey-do",
  "honey-do": "/projects/honey-do",
  lllanguage: "/projects/lllanguage",
  pathranger: "/projects/pathranger",
  cacheclip: "/projects/cacheclip",
  eurovision: "/projects/eurovision-party",
  guitar: "/projects/guitar-visualizer",
  plannet: "/projects/plannet",
  projects: "/projects",
  about: "/#about",
  contact: "/contact",
  experience: "/experience",
  blog: "/blog",
  resume: "/print",
  home: "/",
};

const COMPASS: Record<string, { label: string; path: string }> = {
  north: { label: "projects", path: "/projects" },
  n: { label: "projects", path: "/projects" },
  east: { label: "blog", path: "/blog" },
  e: { label: "blog", path: "/blog" },
  south: { label: "contact", path: "/contact" },
  s: { label: "contact", path: "/contact" },
  west: { label: "about", path: "/#about" },
  w: { label: "about", path: "/#about" },
};

const TRANSMISSIONS = [
  "Static clears. VOLUME is live on the App Store.",
  "Field note: PathRanger was named after getting lost in a monorepo.",
  "Weak signal from Eurovision Party — someone's still scoring songs.",
  "CacheClip caches clipboard. Name does what it says on the tin.",
  "lllanguage: learn from the conversation you already had.",
  "Honey Do is cooking. Literally — family meal planning.",
  "Sophia's Future Doctor Club: habits before white coats.",
  "Radio check: LLMs in production, not just demos.",
  "Bearing confirmed — farpointlabs.com still on the air.",
  "Trail marker: TypeScript · Rust · Python · Go.",
];

// Project keys only — skip site pages so explore lands somewhere interesting
const EXPLORE_KEYS = Object.keys(NAV).filter(
  (k) =>
    ![
      "projects",
      "about",
      "contact",
      "experience",
      "blog",
      "resume",
      "home",
      "sophia",
      "honey",
    ].includes(k),
);

function buildCommands(
  navigate: (path: string) => void,
  commandHistory: string[],
): Record<string, CommandFn> {
  const cmds: Record<string, CommandFn> = {
    help: () => [
      "Available commands:",
      "",
      "  About me",
      "    whoami / about / skills / contact / resume",
      "    projects              Featured work",
      "",
      "  Explore",
      "    map                   Site map with open targets",
      "    explore / wander      Follow a random trail",
      "    go <n|e|s|w>          Compass nav (or: compass)",
      "    find <term>           Search projects",
      "    scan                  Tune the radio",
      "    open <slug>           Jump somewhere (e.g. open volume)",
      "",
      "  Misc",
      "    tree / ls / cat <file> / date / history / clear",
    ],
    whoami: () => [
      "Alexander Cannon",
      "Engineering leader & builder",
      "alexander@farpointlabs.com",
    ],
    projects: () => [
      "Featured:",
      "  VOLUME                     — reading companion (App Store)",
      "  Sophia's Future Doctor Club — habit app for future doctors",
      "  Honey Do                   — family planner (cooking)",
      "  lllanguage                 — language from real conversation",
      "  PathRanger / CacheClip     — Rust CLIs",
      "",
      "Try: open volume | find rust | explore",
    ],
    skills: () => [
      "TypeScript · Rust · Python · Go",
      "React · React Native · Expo · Next.js",
      "AWS · Azure · GCP",
      "Postgres · Redis · Kafka",
      "LLMs in production, not just demos",
    ],
    contact: () => [
      "Email     alexander@farpointlabs.com",
      "GitHub    github.com/AlexanderCannon",
      "LinkedIn  linkedin.com/in/alexandermcannon",
      "Substack  alexandercannon.substack.com",
      "Web       /contact",
    ],
    about: () => [
      "I ship products people return to — apps, tools, and systems.",
      "Background across streaming, fintech, blockchain, and AI.",
      "These days: hands-on building + the leadership work that",
      "keeps architecture honest.",
    ],
    resume: () => {
      navigate("/print");
      return ["Opening printable resume …"];
    },
    open: (args) => {
      const key = (args?.[0] ?? "").toLowerCase();
      const path = NAV[key];
      if (!path) {
        return [
          `open: unknown target "${args?.[0] ?? ""}"`,
          "Try: volume, pathranger, cacheclip, eurovision, resume",
          "Or: map",
        ];
      }
      navigate(path);
      return [`Opening ${path} …`];
    },
    map: () => [
      "          [ N projects ]",
      "                 |",
      "  [ W about ] — ★ — [ E blog ]",
      "                 |",
      "          [ S contact ]",
      "",
      "  Landmarks:",
      "    open projects    /projects",
      "    open experience  /experience",
      "    open blog        /blog",
      "    open contact     /contact",
      "    open resume      /print",
      "    open volume      …and other project slugs",
      "",
      "  Or: go north | explore | find <term>",
    ],
    explore: () => {
      const key =
        EXPLORE_KEYS[Math.floor(Math.random() * EXPLORE_KEYS.length)] ??
        "volume";
      const path = NAV[key]!;
      navigate(path);
      return [`Following a trail to ${key} …`, `→ ${path}`];
    },
    wander: (args) => cmds.explore!(args),
    go: (args) => {
      const dir = (args?.[0] ?? "").toLowerCase();
      if (!dir) {
        return [
          "Usage: go <north|east|south|west>",
          "Or: compass",
        ];
      }
      const dest = COMPASS[dir];
      if (!dest) {
        return [
          `go: unknown bearing "${args?.[0]}"`,
          "Try: north, east, south, west (or n/e/s/w)",
        ];
      }
      navigate(dest.path);
      return [`Heading ${dir} → ${dest.label} (${dest.path})`];
    },
    compass: () => [
      "          N  projects",
      "          |",
      "   W ——— ★ ——— E",
      "  about         blog",
      "          |",
      "          S  contact",
      "",
      "Try: go north",
    ],
    find: (args) => {
      const term = (args ?? []).join(" ").trim().toLowerCase();
      if (!term) return ["Usage: find <term>", "e.g. find rust"];
      const hits = projects.filter((p) => {
        const hay = [
          p.title,
          p.description,
          p.slug,
          ...p.stack,
          ...p.body,
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(term);
      });
      if (hits.length === 0) return ["nothing on the radio"];
      return [
        `Heard ${hits.length} transmission${hits.length === 1 ? "" : "s"}:`,
        ...hits.map(
          (p) => `  ${p.slug.padEnd(28)} ${p.title}`,
        ),
        "",
        `Try: open ${hits[0]!.slug}`,
      ];
    },
    scan: () => {
      const line =
        TRANSMISSIONS[
          Math.floor(Math.random() * TRANSMISSIONS.length)
        ]!;
      return ["*tuning…*", "", `  ≪ ${line} ≫`, ""];
    },
    tree: () => [
      ".",
      "├── about.txt",
      "├── contact.md",
      "├── skills.json",
      "├── resume.json",
      "└── projects/",
      "    ├── volume/",
      "    ├── sophias-future-doctor-club/",
      "    ├── honey-do/",
      "    ├── lllanguage/",
      "    ├── pathranger/",
      "    ├── cacheclip/",
      "    ├── eurovision-party/",
      "    ├── guitar-visualizer/",
      "    └── plannet/",
    ],
    history: () => {
      if (commandHistory.length === 0) {
        return ["No breadcrumbs yet. Try: help"];
      }
      return [
        "Breadcrumbs:",
        ...commandHistory.map((c, i) => `  ${String(i + 1).padStart(3)}  ${c}`),
      ];
    },
    cannon: () => [
      "",
      "        __",
      "    ___/__/___   boom.",
      "   |  ______  |",
      "   | |      | |",
      "   |_|______|_|",
      "",
      "You found the easter egg. Hire the gunner.",
    ],
    sudo: (args) => {
      const phrase = (args ?? []).join(" ").toLowerCase();
      if (phrase === "hire alexander") {
        return [
          "[sudo] password for guest: ********",
          "permission granted.",
          "",
          "  alexander@farpointlabs.com",
          "  LinkedIn  linkedin.com/in/alexandermcannon",
          "",
          "Welcome aboard.",
        ];
      }
      return [
        "alexander is not in the sudoers file. This incident will be reported.",
      ];
    },
    clear: () => "CLEAR",
    date: () => [new Date().toString()],
    ls: () => [
      "about.txt  projects/  contact.md  skills.json  resume.json",
    ],
    cat: (args) => {
      const file = args?.[0]?.toLowerCase();
      if (file === "about.txt") return cmds.about!();
      if (file === "contact.md") return cmds.contact!();
      if (file === "skills.json") return cmds.skills!();
      if (file === "resume.json") return ["Open /resume.json or /print."];
      return [`cat: ${args?.[0] ?? "?"}: No such file`];
    },
  };
  return cmds;
}

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function HomeTerminalPanel() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryEntry[]>(WELCOME);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const konamiRef = useRef(0);

  const navigate = (path: string) => {
    router.push(path);
  };

  const commands = buildCommands(navigate, commandHistory);

  const executeCommand = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const [rawCmd, ...args] = trimmed.split(/\s+/);
    const cmd = (rawCmd ?? "").toLowerCase();

    setHistory((prev) => [
      ...prev,
      { type: "command", content: `~$ ${trimmed}` },
    ]);

    const handler = commands[cmd];
    if (!handler) {
      setHistory((prev) => [
        ...prev,
        {
          type: "output",
          content: `Command not found: ${rawCmd}. Try "help".`,
          muted: true,
        },
      ]);
    } else {
      const result = handler(args);
      if (result === "CLEAR") {
        setHistory(WELCOME);
      } else if (result !== "NAV") {
        setHistory((prev) => [
          ...prev,
          ...result.map((line) => ({
            type: "output" as const,
            content: line,
            muted: true,
          })),
        ]);
      }
    }

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(currentInput);
      setCurrentInput("");
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const next = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(next);
      setCurrentInput(
        commandHistory[commandHistory.length - 1 - next] ?? "",
      );
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setCurrentInput("");
        return;
      }
      const next = historyIndex - 1;
      setHistoryIndex(next);
      setCurrentInput(
        commandHistory[commandHistory.length - 1 - next] ?? "",
      );
    }
  };

  useEffect(() => {
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
      }

      const expected = KONAMI[konamiRef.current];
      if (e.key === expected) {
        konamiRef.current += 1;
        if (konamiRef.current === KONAMI.length) {
          konamiRef.current = 0;
          executeCommand("cannon");
          inputRef.current?.focus();
        }
      } else {
        konamiRef.current = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commandHistory, historyIndex, currentInput]);

  return (
    <div className="leather flex h-full min-h-[28rem] flex-col overflow-hidden rounded-sm">
      <div className="flex items-center gap-2 border-b border-leather-edge bg-leather-edge/80 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-stamp" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#5a9e6f]" />
        <span className="ml-2 font-mono text-[11px] tracking-tight text-[hsl(40_28%_68%)]">
          field radio — zsh
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 cursor-text overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed text-[#e8e2d9]"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="space-y-0.5">
          {history.map((entry, i) => (
            <div key={`${i}-${entry.content.slice(0, 12)}`}>
              {entry.type === "command" ? (
                <p className="text-stamp">{entry.content}</p>
              ) : (
                <pre
                  className={`whitespace-pre-wrap break-words ${
                    entry.muted ? "text-[#8a847c]" : "text-[#e8e2d9]"
                  }`}
                >
                  {entry.content}
                </pre>
              )}
            </div>
          ))}

          <div className="flex items-center gap-2 pt-1">
            <span className="shrink-0 text-stamp">~$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-w-0 flex-1 bg-transparent text-[#e8e2d9] caret-stamp outline-none"
              autoComplete="off"
              spellCheck={false}
              aria-label="Terminal input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
