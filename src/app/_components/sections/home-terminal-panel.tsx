"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

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

function buildCommands(navigate: (path: string) => void): Record<
  string,
  CommandFn
> {
  return {
    help: () => [
      "Available commands:",
      "  help / whoami / projects / skills / contact / about",
      "  open <slug>  Jump to a project (e.g. open volume)",
      "  resume       Printable resume",
      "  clear / date / ls / cat <file>",
      "  cannon       Easter egg",
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
      'Try: open volume',
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
        ];
      }
      navigate(path);
      return [`Opening ${path} …`];
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
    clear: () => "CLEAR",
    date: () => [new Date().toString()],
    ls: () => [
      "about.txt  projects/  contact.md  skills.json  resume.json",
    ],
    cat: (args) => {
      const file = args?.[0]?.toLowerCase();
      if (file === "about.txt") return buildCommands(navigate).about!();
      if (file === "contact.md") return buildCommands(navigate).contact!();
      if (file === "skills.json") return buildCommands(navigate).skills!();
      if (file === "resume.json") return ["Open /resume.json or /print."];
      return [`cat: ${args?.[0] ?? "?"}: No such file`];
    },
  };
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

  const commands = buildCommands(navigate);

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
    <div className="leather rivet flex h-full min-h-[28rem] flex-col overflow-hidden rounded-sm">
      <div className="flex items-center gap-2 border-b border-leather-edge bg-leather-edge/80 px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-stamp" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#5a9e6f]" />
        <span className="ml-2 font-mono text-[11px] tracking-wide text-[hsl(40_28%_68%)]">
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
