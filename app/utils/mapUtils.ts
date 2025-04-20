import { NewsItem as PrismaNewsItem, Category } from "@prisma/client";
import { NewsItem } from "../types";

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
