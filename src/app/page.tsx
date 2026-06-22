import { api, HydrateClient } from "~/trpc/server";
import { type Metadata } from "next";
import HomePageTerminal from "./_components/sections/home-page-terminal";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Alexander Cannon's portfolio website",
  openGraph: {
    title: "Alexander Cannon - Portfolio",
    description: "Welcome to Alexander Cannon's portfolio website",
    type: 'website',
    images: [
      {
        url: '/api/og?title=Alexander Cannon&description=Portfolio and Blog',
        width: 1200,
        height: 630,
        alt: 'Alexander Cannon Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alexander Cannon - Portfolio',
    description: 'Welcome to Alexander Cannon\'s portfolio website',
    images: ['/api/og?title=Alexander Cannon&description=Portfolio and Blog'],
  },
};

// Enable ISR with 1 hour revalidation
export const revalidate = 3600;

export default async function Home() {
  try {
    // Optional prefetch with caching – remove if it fails at build time
    await api.post.getLatest.prefetch();
  } catch (error) {
    console.error("Prefetch error:", error);
  }

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b">
        <HomePageTerminal />
      </main>
    </HydrateClient>
  );
}
