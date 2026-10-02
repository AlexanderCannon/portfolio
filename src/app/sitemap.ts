import { type MetadataRoute } from "next";
import { projects } from "~/app/projects/data";
import { db } from "~/server/db";

const base = "https://alexandercannon.dev";
const pages = [
  "",
  "/about",
  "/projects",
  "/experience",
  "/blog",
  "/contact",
  "/volume-app",
  "/sophias-future-doctor-club",
  "/eurovision-party",
];

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ponytail: DB failure (e.g. build without DATABASE_URL access) just drops blog posts from the sitemap.
  const posts = await db.query.posts
    .findMany({ columns: { slug: true, createdAt: true, updatedAt: true } })
    .catch(() => []);

  return [
    ...pages.map((p) => ({ url: `${base}${p}` })),
    ...projects.map((p) => ({ url: `${base}/projects/${p.slug}` })),
    ...posts
      .filter((p) => p.slug)
      .map((p) => ({
        url: `${base}/blog/${p.slug}`,
        lastModified: p.updatedAt ?? p.createdAt,
      })),
  ];
}
