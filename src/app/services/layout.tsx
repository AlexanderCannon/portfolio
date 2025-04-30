import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "View the services offered by Alexander Cannon",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 