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
    const item = /<item>([\s\S]*?)<\/item>/.exec(xml)?.[1];
    if (!item) return null;
    const titleMatch =
      /<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/.exec(item) ??
      /<title>(.*?)<\/title>/.exec(item);
    const title = titleMatch?.[1] ?? titleMatch?.[2] ?? null;
    const link = /<link>(.*?)<\/link>/.exec(item)?.[1] ?? null;
    const date = /<pubDate>(.*?)<\/pubDate>/.exec(item)?.[1] ?? null;
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
