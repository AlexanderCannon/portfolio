import { cache } from "react";

export type SubstackPost = {
  title: string;
  link: string;
  date: string | null;
};

export const getLatestSubstack = cache(async (): Promise<SubstackPost | null> => {
  try {
    const res = await fetch("https://alexandercannon.substack.com/feed", {
      next: { revalidate: 3600 },
      headers: { Accept: "application/rss+xml, application/xml, text/xml" },
    });
    if (!res.ok) return null;
    const xml = await res.text();
    const item = xml.match(/<item>([\s\S]*?)<\/item>/)?.[1];
    if (!item) return null;
    const title = item
      .match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/)?.[1]
      ?? item.match(/<title>(.*?)<\/title>/)?.[1]
      ?? null;
    const link = item.match(/<link>(.*?)<\/link>/)?.[1] ?? null;
    const date = item.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] ?? null;
    if (!title || !link) return null;
    return { title: decodeXml(title), link, date };
  } catch {
    return null;
  }
});

function decodeXml(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}
