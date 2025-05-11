import { MetadataRoute } from "next";
import { Chain } from "./types";
import { siteConfig } from "./config/seo-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl || "",
      lastModified: new Date(),
      priority: 1,
    },
  ];

  if (baseUrl) {
    // Add chain root pages
    const chains = Object.values(Chain);
    for (const chain of chains) {
      // Skip disabled chains if needed
      if (chain === Chain.SOLANA || chain === Chain.BITCOIN) continue;

      const url = `${baseUrl}/${chain.toLowerCase()}/news`;
      routes.push({
        url: url,
        lastModified: new Date(),
        priority: 0.9,
      });
    }

    // Add current year and a few months back
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    // For the current year
    for (let month = 1; month <= currentMonth; month++) {
      // Use 4 weeks per month
      for (let week = 1; week <= 4; week++) {
        routes.push({
          url: `${baseUrl}/ethereum/news/${currentYear}/${month}/${week}`,
          lastModified: new Date(currentYear, month - 1, week * 7),
          priority: 0.8,
        });
      }
    }
  }

  return routes;
}
