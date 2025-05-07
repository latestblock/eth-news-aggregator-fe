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
  // const ogImage = image || siteConfig.ogImage;

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      // images: [
      //   {
      //     url: ogImage.startsWith("http")
      //       ? ogImage
      //       : `${siteConfig.url}${ogImage}`,
      //     width: 1200,
      //     height: 630,
      //     alt: metaTitle,
      //   },
      // ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      // images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
