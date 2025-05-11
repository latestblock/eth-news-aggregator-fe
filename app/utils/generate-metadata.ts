import { Metadata } from "next";
import { siteConfig } from "@/app/config/seo-config";

type GenerateMetadataProps = {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
};

export function generateMetadata({
  title,
  description,
  image,
  noIndex = false,
}: GenerateMetadataProps): Metadata {
  const metaTitle = title ? title : siteConfig.name;
  const metaDescription = description || siteConfig.description;
  const ogImage = image || `/og-images/default.png`;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      type: "website",
      siteName: siteConfig.name,
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [ogImage.startsWith("http") ? ogImage : `${baseUrl}${ogImage}`],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
