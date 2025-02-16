import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Script from "next/script"
import HeaderSticky from "~/app/_components/ui/header-sticky";
import Footer from "~/app/_components/ui/footer";
// import LiveChatButton from "~/app/_components/live-chat";
import CookiePopup from "./_components/ui/cookie-popup";

import { TRPCReactProvider } from "~/trpc/react";
import { ThemeProvider } from "./_components/withTheme";

export const metadata: Metadata = {
  title: "Alexander Cannon",
  description: "Learn about Alexander Cannon",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const title = metadata.title as string;
  const description = metadata.description!;
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* Google Analytics */}
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
      <body>
        <TRPCReactProvider>
          <ThemeProvider>
            <HeaderSticky />
            {children}
            <Footer />
            {/* <LiveChatButton /> */}
            <CookiePopup />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html >
  );
}
