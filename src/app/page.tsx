import { api, HydrateClient } from "~/trpc/server";
import HomePage from "~/app/_components/sections/home-page";
import { type Metadata } from "next";
import HomePageTerminal from "./_components/sections/home-page-terminal";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Alexander Cannon's portfolio website",
};

export default async function Home() {
  try {
    // Optional prefetch – remove if it fails at build time
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
