import prisma from "@/lib/prisma";
import { mapPrismaNewsItemsToComponentNewsItems } from "@/app/utils/newsUtils";
import { Chain } from "../types";
import { convertToPrismaChain } from "../utils/chainUtils";

/**
 * Fetch available date ranges for news items
 */
export async function fetchAvailableDateRanges(chain: Chain) {
  const newsItems = await prisma.newsItem.findMany({
    where: {
      status: "APPROVED",
      date: {
        not: null,
      },
      chain: chain as any,
    },
    select: {
      date: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  const yearMonthWeekMap = new Map<number, Map<number, Set<number>>>();

  // Process each news item to organize by year, month, week
  newsItems.forEach((item) => {
    if (!item.date) return;

    const date = new Date(item.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // JavaScript months are 0-based
    const dayOfMonth = date.getDate();
    const week = Math.ceil(dayOfMonth / 7);

    // Add to year map
    if (!yearMonthWeekMap.has(year)) {
      yearMonthWeekMap.set(year, new Map());
    }

    // Add to month map
    const monthMap = yearMonthWeekMap.get(year)!;
    if (!monthMap.has(month)) {
      monthMap.set(month, new Set());
    }

    // Add to week set
    monthMap.get(month)!.add(week);
  });

  // Convert the map to the structure needed for the sidebar
  const newsGroups = [];

  // Sort years in descending order
  const sortedYears = Array.from(yearMonthWeekMap.keys()).sort((a, b) => b - a);

  for (const year of sortedYears) {
    const monthMap = yearMonthWeekMap.get(year)!;
    const months = [];

    // Sort months in descending order
    const sortedMonths = Array.from(monthMap.keys()).sort((a, b) => b - a);

    for (const month of sortedMonths) {
      const weekSet = monthMap.get(month)!;
      const weeks = [];

      // Sort weeks in descending order
      const sortedWeeks = Array.from(weekSet).sort((a, b) => b - a);

      for (const week of sortedWeeks) {
        weeks.push({
          week,
          items: [],
        });
      }

      months.push({
        month,
        weeks,
      });
    }

    newsGroups.push({
      year,
      months,
    });
  }

  return newsGroups;
}

/**
 * Fetch news items for a specific week
 */
export async function fetchNewsItemsForWeek(
  startDay: Date,
  endDay: Date,
  chain: Chain
) {
  try {
    const dbNewsItems = await prisma.newsItem.findMany({
      where: {
        date: {
          gte: startDay,
          lte: endDay,
        },
        status: "APPROVED",
        chain: chain as any,
      },
      include: {
        Category: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    return mapPrismaNewsItemsToComponentNewsItems(dbNewsItems);
  } catch (error) {
    console.error("Error fetching news items for week:", error);
    return [];
  }
}
