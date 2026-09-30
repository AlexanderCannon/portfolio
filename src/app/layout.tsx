import "~/styles/globals.css";

import {
  Bricolage_Grotesque,
  IBM_Plex_Sans,
  IBM_Plex_Mono,
} from "next/font/google";
import { type Metadata } from "next";
import Script from "next/script";
import HeaderSticky from "~/app/_components/ui/header-sticky";
import Footer from "~/app/_components/ui/footer";
import CookiePopup from "./_components/ui/cookie-popup";
import PressStatus from "~/app/_components/ui/press-status";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "./_components/withTheme";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Alexander Cannon",
    template: "%s | Alexander Cannon",
  },
  description: "Engineering leader and builder — apps, tools, and systems.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <head>
        <Script
          id="theme-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=document.cookie.match(/(?:^|; )preferred-theme=([^;]*)/);var v=t?decodeURIComponent(t[1]):"dark";if(v!=="light")document.documentElement.classList.add("dark");else document.documentElement.classList.remove("dark");}catch(e){document.documentElement.classList.add("dark");}})();`,
          }}
        />
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-JW1DQC0Z3P`}
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JW1DQC0Z3P');
          `}
        </Script>
      </head>
      <body className="min-h-screen font-sans">
        <TRPCReactProvider>
          <ThemeProvider>
            <PressStatus />
            <HeaderSticky />
            {children}
            <Footer />
            <CookiePopup />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
