import { type Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Eurovision Party",
  description: "Join the ultimate Eurovision voting experience with Eurovision.fun",
};

export default function EurovisionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white py-4 px-6">
          <div className="container mx-auto flex justify-center space-x-6 text-sm">
            <Link 
              href="/contact"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Contact
            </Link>
            <Link 
              href="/privacy-policy"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
          <div className="text-center text-gray-400 text-xs mt-2">
            © {new Date().getFullYear()} Eurovision.fun. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}