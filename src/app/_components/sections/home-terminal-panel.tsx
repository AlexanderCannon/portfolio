"use client";

import { useEffect, useRef, useState } from "react";

interface HistoryEntry {
  type: "command" | "output";
  content: string;
  muted?: boolean;
}

type CommandFn = (args?: string[]) => string[] | "CLEAR";

const WELCOME: HistoryEntry[] = [
  {
    type: "output",
    content: "Alexander Cannon — terminal",
  },
  {
    type: "output",
    content: 'Type "help" for commands. Arrow keys for history.',
    muted: true,
  },
  { type: "output", content: "" },
];

const commands: Record<string, CommandFn> = {
  help: () => [
    "Available commands:",
    "  help        Who you are talking to",
    "  whoami      Short bio",
    "  projects    Things I have shipped",
    "  skills      Stack I reach for",
    "  contact     How to reach me",
    "  about       A bit more",
    "  clear       Wipe the screen",
    "  date        Current date",
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
    "  Honey Do                   — family planner",
    "  lllanguage                 — language from real conversation",
    "  PathRanger / CacheClip     — Rust CLIs",
    "",
    "See /projects for the full list.",
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
  clear: () => "CLEAR",
  date: () => [new Date().toString()],
  ls: () => ["about.txt  projects/  contact.md  skills.json  resume.json"],
  cat: (args) => {
    const file = args?.[0]?.toLowerCase();
    if (file === "about.txt") return commands.about!();
    if (file === "contact.md") return commands.contact!();
    if (file === "skills.json") return commands.skills!();
    if (file === "resume.json") return ["Open /resume.json in the browser."];
    return [`cat: ${args?.[0] ?? "?"}: No such file`];
  },
};

export default function HomeTerminalPanel() {
  const [history, setHistory] = useState<HistoryEntry[]>(WELCOME);
  const [currentInput, setCurrentInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      } else {
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
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="flex h-full min-h-[28rem] flex-col overflow-hidden rounded-md border border-line bg-card shadow-[0_24px_60px_-28px_rgba(20,40,35,0.35)]">
      <div className="flex items-center gap-2 border-b border-line bg-secondary/60 px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-line" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/50" />
        <span className="ml-2 font-mono text-[11px] tracking-wide text-ink-muted">
          alexander — zsh
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 cursor-text overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="space-y-0.5">
          {history.map((entry, i) => (
            <div key={`${i}-${entry.content.slice(0, 12)}`}>
              {entry.type === "command" ? (
                <p className="text-accent">{entry.content}</p>
              ) : (
                <pre
                  className={`whitespace-pre-wrap break-words ${
                    entry.muted ? "text-ink-muted" : "text-ink"
                  }`}
                >
                  {entry.content}
                </pre>
              )}
            </div>
          ))}

          <div className="flex items-center gap-2 pt-1">
            <span className="shrink-0 text-accent">~$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-w-0 flex-1 bg-transparent text-ink outline-none"
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
