"use client";

import { useEffect, useState } from "react";

function parseRepo(url: string): { owner: string; repo: string } | null {
  const m = /github\.com\/([^/]+)\/([^/#?]+)/i.exec(url);
  if (!m?.[1] || !m[2]) return null;
  return { owner: m[1], repo: m[2].replace(/\.git$/, "") };
}

type Meta = { stars: number; pushedAt: string };

export default function GithubMeta({ github }: { github: string }) {
  const [meta, setMeta] = useState<Meta | null>(null);

  useEffect(() => {
    const parsed = parseRepo(github);
    if (!parsed) return;
    let cancelled = false;
    void fetch(`https://api.github.com/repos/${parsed.owner}/${parsed.repo}`, {
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { stargazers_count?: number; pushed_at?: string } | null) => {
        if (cancelled || !data?.pushed_at) return;
        setMeta({
          stars: data.stargazers_count ?? 0,
          pushedAt: data.pushed_at,
        });
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [github]);

  if (!meta) return null;

  const when = new Date(meta.pushedAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-muted">
      ★ {meta.stars} · pushed {when}
    </p>
  );
}
