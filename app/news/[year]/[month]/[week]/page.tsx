import { Sidebar } from "@/app/components/sidebar";
import { WeeklyNewsContent } from "@/app/components/weekly-news-content";
import { formatDateRange } from "@/app/utils/dateUtils";
import {
  fetchAvailableDateRanges,
  fetchNewsItemsForWeek,
} from "@/app/actions/news.actions";
import { groupByCategory } from "@/app/utils/newsUtils";
import { Chain } from "@/app/types";

export default async function NewsPage({
  params,
}: {
  params: { year: string; month: string; week: string };
}) {
  const year = parseInt(params.year);
  const month = parseInt(params.month) - 1;
  const week = parseInt(params.week);

  // Calculate start and end dates for the week
  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = new Date(year, month, (week - 1) * 7 + 1);
  const endDay = new Date(year, month, week * 7);

  // Fetch data in parallel
  const [newsItems, newsGroups] = await Promise.all([
    fetchNewsItemsForWeek(startDay, endDay, Chain.ETHEREUM),
    fetchAvailableDateRanges(Chain.ETHEREUM),
  ]);
  const groupedItems = groupByCategory(newsItems);
  const dateRangeTitle = formatDateRange(startDay, endDay);
  return (
    <div className="w-fit mx-4 bg-light-panel shadow-2xl rounded-xl flex border border-border/60">
      <Sidebar newsGroups={newsGroups} />
      <WeeklyNewsContent
        dateRangeTitle={dateRangeTitle}
        groupedItems={groupedItems}
      />
    </div>
  );
}
