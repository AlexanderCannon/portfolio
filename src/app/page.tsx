import { type Metadata } from "next";
import HomeEditorial from "~/app/_components/sections/home-editorial";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Alexander Cannon – apps, tools, and systems.",
};

export default function Home() {
  return (
    <main>
      <HomeEditorial />
    </main>
  );
}
