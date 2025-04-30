import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description: "View Alexander Cannon's professional experience and skills",
};

export default function ExperienceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 