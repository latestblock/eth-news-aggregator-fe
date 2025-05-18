import { Metadata } from "next";
import { siteConfig } from "@/app/config/seo-config";
import { Chain } from "@/app/types";

type GenerateMetadataProps = {
  title?: string;
  description?: string;
  image?: string;
  chain?: Chain;
  noIndex?: boolean;
};

export function generateMetadata({
  title,
  description,
  image,
  chain = Chain.ETHEREUM,
  noIndex = true,
}: GenerateMetadataProps): Metadata {
  const metaTitle = title ? title : siteConfig.name;
  const metaDescription = description || siteConfig.description;
  // Use siteConfig.url as fallback and ensure trailing slash
  const baseUrl = (
    process.env.NEXT_PUBLIC_APP_URL ||
    siteConfig.url ||
    "https://latestblock.net"
  ).endsWith("/")
    ? process.env.NEXT_PUBLIC_APP_URL ||
      siteConfig.url ||
      "https://latestblock.net"
    : `${
        process.env.NEXT_PUBLIC_APP_URL ||
        siteConfig.url ||
        "https://latestblock.net"
      }/`;

  // Generate dynamic OG image URL using our API
  const dynamicOgImage =
    image ||
    `${baseUrl}api/og?chain=${chain}&title=${encodeURIComponent(
      metaTitle
    )}&description=${encodeURIComponent(metaDescription)}`;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: baseUrl,
      images: [
        {
          url: dynamicOgImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      type: "website",
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [dynamicOgImage],
    },
    alternates: {
      canonical: baseUrl,
    },
    other: {
      "og:logo": `${baseUrl}${
        siteConfig.logo.startsWith("/")
          ? siteConfig.logo.slice(1)
          : siteConfig.logo
      }`,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
