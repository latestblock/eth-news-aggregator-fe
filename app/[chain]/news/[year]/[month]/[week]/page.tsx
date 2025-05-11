import { redirect } from "next/navigation";
import { Sidebar } from "@/app/components/sidebar";
import { MobileSidebarController } from "@/app/components/mobile-sidebar-controller";
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
import { Metadata } from "next";
import { generateMetadata as generatePageMetadata } from "@/app/utils/generate-metadata";

type Props = {
  params: { chain: string; year: string; month: string; week: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const year = parseInt(params.year);
  const month = parseInt(params.month) - 1;
  const week = parseInt(params.week);

  // Validate chain parameter
  const chainParam = params.chain.toUpperCase();
  const chain = Object.values(Chain).includes(chainParam as Chain)
    ? (chainParam as Chain)
    : getDefaultChain();

  // Calculate start and end dates for the week
  const startDay = new Date(year, month, (week - 1) * 7 + 1);
  const endDay = new Date(year, month, week * 7);

  const dateRangeTitle = formatDateRange(startDay, endDay);
  const formattedChainName =
    chain.charAt(0).toUpperCase() + chain.slice(1).toLowerCase();

  const title = `${formattedChainName} News: ${dateRangeTitle}`;
  const description = `${formattedChainName} blockchain news and updates for the week of ${dateRangeTitle}. Stay informed with the latest developments.`;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const ogImageUrl = `${baseUrl}/api/og?chain=${chain}&title=${encodeURIComponent(
    title
  )}&description=${encodeURIComponent(description)}`;

  return generatePageMetadata({
    title,
    description,
    image: ogImageUrl,
  });
}

export default async function ChainNewsPage({ params }: Props) {
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
    <>
      {/* Mobile sidebar controller (includes toggle button in navbar) */}
      <MobileSidebarController newsGroups={newsGroups} chainId={chain} />

      {/* Main content */}
      <div className="w-full item-center justify-center py-4 px-3 sm:px-6 md:px-8 flex flex-col min-[981px]:flex-row min-[981px]:gap-6 mx-auto max-w-screen-xl">
        {/* Desktop sidebar - hidden at 980px and below */}
        <div className="hidden min-[981px]:block min-[981px]:w-64 lg:w-72 min-[981px]:-ml-2 flex-shrink-0">
          <Sidebar newsGroups={newsGroups} chainId={chain} />
        </div>

        {/* Weekly news content */}
        <div className="flex-grow w-full min-[981px]:w-[calc(100%-280px)] lg:w-[calc(100%-300px)] max-w-4xl">
          <WeeklyNewsContent
            dateRangeTitle={dateRangeTitle}
            groupedItems={groupedItems}
            chainName={chain}
          />
        </div>
      </div>
    </>
  );
}
