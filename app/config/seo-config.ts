export const siteConfig = {
  name: "Latest Block",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://latestblock.net",
  //   ogImage: "/og-images/default.png",
  description:
    "Stay updated with the latest Ethereum news aggregated from trusted sources across the web.",
  links: {
    twitter: "https://twitter.com/ethnewsagg",
  },
  keywords: ["ethereum", "news", "blockchain", "crypto", "web3", "defi"],
  authors: [
    {
      name: "Latest Block Team",
      url: process.env.NEXT_PUBLIC_APP_URL || "https://latestblock.net",
    },
  ],
  creator: "Latest Block Team",
  twitter: {
    card: "summary_large_image" as const,
    creator: "@ethnewsagg",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  locale: "en_US",
  logo: "/favicon-32x32.png",
};

export const seoConfig = {
  defaultTitle: siteConfig.name,
  titleTemplate: `%s | ${siteConfig.name}`,
  defaultDescription: siteConfig.description,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: `${
          siteConfig.url
        }/api/og?chain=ETHEREUM&title=${encodeURIComponent(
          siteConfig.name
        )}&description=${encodeURIComponent(siteConfig.description)}`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
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
    {
      property: "og:image:width",
      content: "1200",
    },
    {
      property: "og:image:height",
      content: "630",
    },
    {
      name: "twitter:image",
      content: `${
        siteConfig.url
      }/api/og?chain=ETHEREUM&title=${encodeURIComponent(
        siteConfig.name
      )}&description=${encodeURIComponent(siteConfig.description)}`,
    },
    {
      property: "og:image:type",
      content: "image/png",
    },
    {
      property: "og:locale",
      content: siteConfig.locale,
    },
    {
      property: "og:logo",
      content: `${siteConfig.url}${siteConfig.logo}`,
    },
  ],
};
