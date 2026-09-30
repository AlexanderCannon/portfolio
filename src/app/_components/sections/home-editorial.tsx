import { getLatestSubstack } from "~/lib/substack";
import HomeEditorialClient from "~/app/_components/sections/home-editorial-client";

export default async function HomeEditorial() {
  const substack = await getLatestSubstack();
  return <HomeEditorialClient substack={substack} />;
}
