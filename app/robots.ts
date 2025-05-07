import { MetadataRoute } from "next";
import { siteConfig } from "./config/seo-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
