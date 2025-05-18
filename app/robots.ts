import { MetadataRoute } from "next";
import { siteConfig } from "./config/seo-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "*",
        disallow: "/api/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
