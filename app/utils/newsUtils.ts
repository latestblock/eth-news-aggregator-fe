import { NewsItem as PrismaNewsItem, Category } from "@prisma/client";
import { NewsItem } from "../types";
import { ETHEREUM_NEWS_CATEGORIES } from "../config/categories";

type NewsItemWithCategory = PrismaNewsItem & {
  Category?: Category | null;
};

/**
 * Maps a Prisma NewsItem to the format expected by the NewsList component
 */
export function mapPrismaNewsItemToComponentNewsItem(
  prismaItem: NewsItemWithCategory
): NewsItem {
  return {
    id: prismaItem.id,
    headline: prismaItem.headline,
    summary: prismaItem.summary,
    source: prismaItem.source || "",
    date: prismaItem.date ? new Date(prismaItem.date) : new Date(),
    link: prismaItem.link || "",
    category:
      prismaItem.Category?.name || prismaItem.category || "Uncategorized",
    categoryId: prismaItem.categoryId,
    createdAt: prismaItem.createdAt,
    approvedAt: prismaItem.approvedAt,
    publishedAt: prismaItem.publishedAt,
    newsDigestId: prismaItem.newsDigestId || "",
    status: prismaItem.status as "APPROVED" | "PENDING" | "REJECTED",
    adminMsgId: prismaItem.adminMsgId,
    chatId: prismaItem.chatId,
    feedUrl: prismaItem.feedUrl || "",
  };
}

/**
 * Maps an array of Prisma NewsItems to the format expected by the NewsList component
 */
export function mapPrismaNewsItemsToComponentNewsItems(
  prismaItems: NewsItemWithCategory[]
): NewsItem[] {
  return prismaItems.map(mapPrismaNewsItemToComponentNewsItem);
}

/**
 * Groups news items by their category and sorts them according to the defined order
 */
export function groupByCategory(newsItems: NewsItem[]) {
  const groupedItems: Record<string, NewsItem[]> = {};

  // Initialize all categories with empty arrays
  ETHEREUM_NEWS_CATEGORIES.forEach((category) => {
    groupedItems[category] = [];
  });

  // Add "Uncategorized" category
  groupedItems["Uncategorized"] = [];

  // Group items by category
  newsItems.forEach((item) => {
    const categoryName = item.category || "Uncategorized";
    if (groupedItems[categoryName]) {
      groupedItems[categoryName].push(item);
    } else {
      groupedItems["Uncategorized"].push(item);
    }
  });

  // Remove empty categories
  Object.keys(groupedItems).forEach((category) => {
    if (groupedItems[category].length === 0) {
      delete groupedItems[category];
    }
  });

  return groupedItems;
}
