import { redirect } from "next/navigation";
import { Sidebar } from "@/app/components/sidebar";
import { WeeklyNewsContent } from "@/app/components/weekly-news-content";
import { formatDateRange } from "@/app/utils/dateUtils";
import {
  fetchAvailableDateRanges,
  fetchNewsItemsForWeek,
} from "@/app/actions/news.actions";
import { groupByCategory } from "@/app/utils/newsUtils";
import { Chain } from "@/app/types";
import { getDefaultChain } from "@/app/utils/chainUtils";
import { chainOptions } from "@/app/components/chain-icons";

export default async function ChainNewsPage({
  params,
}: {
  params: { chain: string; year: string; month: string; week: string };
}) {
  const year = parseInt(params.year);
  const month = parseInt(params.month) - 1;
  const week = parseInt(params.week);

  // Validate chain parameter
  const chainParam = params.chain.toUpperCase();
  const chain = Object.values(Chain).includes(chainParam as Chain)
    ? (chainParam as Chain)
    : getDefaultChain();

  // Check if the chain is disabled
  const chainOption = chainOptions.find((option) => option.id === chain);
  if (chainOption?.disabled) {
    // Redirect to Ethereum if the chain is disabled
    redirect(
      `/${getDefaultChain()}/news/${params.year}/${params.month}/${params.week}`
    );
  }

  // Calculate start and end dates for the week
  const firstDayOfMonth = new Date(year, month, 1);
  const startDay = new Date(year, month, (week - 1) * 7 + 1);
  const endDay = new Date(year, month, week * 7);

  // Fetch data in parallel
  const [newsItems, newsGroups] = await Promise.all([
    fetchNewsItemsForWeek(startDay, endDay, chain),
    fetchAvailableDateRanges(chain),
  ]);

  const groupedItems = groupByCategory(newsItems);
  const dateRangeTitle = formatDateRange(startDay, endDay);

  return (
    <div className="w-fit mx-4 bg-light-panel shadow-2xl rounded-xl flex border border-border/60">
      <Sidebar newsGroups={newsGroups} chainId={chain} />
      <WeeklyNewsContent
        dateRangeTitle={dateRangeTitle}
        groupedItems={groupedItems}
        chainName={chain}
      />
    </div>
  );
}
