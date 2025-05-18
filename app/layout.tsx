import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import { Providers } from "./providers";
import { siteConfig } from "./config/seo-config";
import { Chain } from "./types";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Ensure URL has trailing slash
const baseUrl = siteConfig.url.endsWith("/")
  ? siteConfig.url
  : `${siteConfig.url}/`;

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: `${baseUrl}api/og?chain=ETHEREUM&title=${encodeURIComponent(
          siteConfig.name
        )}&description=${encodeURIComponent(siteConfig.description)}`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: siteConfig.twitter.card,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      `${baseUrl}api/og?chain=ETHEREUM&title=${encodeURIComponent(
        siteConfig.name
      )}&description=${encodeURIComponent(siteConfig.description)}`,
    ],
    creator: siteConfig.twitter.creator,
  },
  icons: siteConfig.icons,
  manifest: siteConfig.manifest,
  other: {
    "og:locale": "en_US",
    "og:logo": `${baseUrl}${
      siteConfig.logo.startsWith("/")
        ? siteConfig.logo.slice(1)
        : siteConfig.logo
    }`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-background text-foreground max-w-screen-xl mx-auto fixed-container`}
      >
        <Providers>
          <div className="w-full fixed-navbar">
            <Navbar />
          </div>
          <main className="w-full pb-10 pt-24 flex flex-col items-center justify-center shadow-xl bg-background border border-border fixed-content">
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
