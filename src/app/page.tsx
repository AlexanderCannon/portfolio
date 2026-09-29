import { api, HydrateClient } from "~/trpc/server";
import { type Metadata } from "next";
import HomeEditorial from "~/app/_components/sections/home-editorial";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Alexander Cannon — engineering leader and builder of apps, tools, and systems.",
};

export default async function Home() {
  try {
    await api.post.getLatest.prefetch();
  } catch (error) {
    console.error("Prefetch error:", error);
  }

  return (
    <HydrateClient>
      <main>
        <HomeEditorial />
      </main>
    </HydrateClient>
  );
}
