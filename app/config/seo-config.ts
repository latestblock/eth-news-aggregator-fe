export const siteConfig = {
  name: "Ethereum News Aggregator",
  url: process.env.NEXT_PUBLIC_APP_URL,
  //   ogImage: "/og-images/default.png",
  description:
    "Stay updated with the latest Ethereum news aggregated from trusted sources across the web.",
  links: {
    twitter: "https://twitter.com/ethnewsagg",
  },
  keywords: ["ethereum", "news", "blockchain", "crypto", "web3", "defi"],
  authors: [
    {
      name: "Ethereum News Aggregator Team",
      url: process.env.NEXT_PUBLIC_APP_URL,
    },
  ],
  creator: "Ethereum News Aggregator Team",
  twitter: {
    card: "summary_large_image" as const,
    creator: "@ethnewsagg",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${process.env.NEXT_PUBLIC_APP_URL}/site.webmanifest`,
};

export const seoConfig = {
  defaultTitle: siteConfig.name,
  titleTemplate: `%s | ${siteConfig.name}`,
  defaultDescription: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      //   {
      //     url: `${siteConfig.url}${siteConfig.ogImage}`,
      //     width: 1200,
      //     height: 630,
      //     alt: siteConfig.name,
      //   },
    ],
  },
  twitter: {
    handle: "@ethnewsagg",
    site: "@ethnewsagg",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1",
    },
  ],
};
