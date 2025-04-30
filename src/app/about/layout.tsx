import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Alexander Cannon and his background",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 