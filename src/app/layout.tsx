import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Instrument_Serif } from "next/font/google";
import { type Metadata } from "next";
import Script from "next/script";
import HeaderSticky from "~/app/_components/ui/header-sticky";
import Footer from "~/app/_components/ui/footer";
import CookiePopup from "./_components/ui/cookie-popup";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "./_components/withTheme";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
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
      className={`${GeistSans.variable} ${instrumentSerif.variable}`}
    >
      <head>
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
