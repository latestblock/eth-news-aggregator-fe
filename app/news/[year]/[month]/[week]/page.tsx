import { Sidebar } from "@/app/components/sidebar";
import { WeeklyNewsContent } from "@/app/components/weekly-news-content";
import { getDateRangeForWeek, formatDateRange } from "@/app/utils/dateUtils";
import {
  fetchAvailableDateRanges,
  fetchNewsItemsForWeek,
} from "@/app/actions/news.actions";
import { groupByCategory } from "@/app/utils/newsUtils";

export default async function NewsPage({
  params,
}: {
  params: { year: string; month: string; week: string };
}) {
  const year = parseInt(params.year);
  const month = parseInt(params.month);
  const week = parseInt(params.week);

  // Get date range for the requested week
  const { startDay, endDay } = getDateRangeForWeek(year, month, week);

  // Fetch data in parallel
  const [newsItems, newsGroups] = await Promise.all([
    fetchNewsItemsForWeek(startDay, endDay),
    fetchAvailableDateRanges(),
  ]);
  const groupedItems = groupByCategory(newsItems);
  const dateRangeTitle = formatDateRange(startDay, endDay);

  return (
    <>
      <Sidebar newsGroups={newsGroups} />
      <WeeklyNewsContent
        dateRangeTitle={dateRangeTitle}
        groupedItems={groupedItems}
      />
    </>
  );
}
