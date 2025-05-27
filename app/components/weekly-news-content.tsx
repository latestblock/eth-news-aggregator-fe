"use client"

import { NewsList } from "@/app/components/news-list";
import { NewsItem, Chain } from "@/app/types";

type WeeklyNewsContentProps = {
  dateRangeTitle: string;
  groupedItems: Record<string, NewsItem[]>;
  chainName?: Chain;
};

const logInitialTweet = (groupedItems: Record<string, NewsItem[]>, chainName: Chain) => {
  // Get the first item's publishedAt date from any category
  const firstItem = Object.values(groupedItems)[0]?.[0];
  if (!firstItem?.publishedAt) return;

  const date = new Date(firstItem.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const tweet = `📢 THREAD: ${chainName.toUpperCase()} WEEKLY — ${date}
📲 http://t.me/latestblocknews
🌍 https://latestblock.net

Follow us for fresh updates every Tuesday 📷

#${chainName}news #${chainName}`;
  console.log(tweet);
};

export const WeeklyNewsContent = (props: WeeklyNewsContentProps) => {
  const { dateRangeTitle, groupedItems, chainName = Chain.ETHEREUM } = props;

  // Log initial tweet
  logInitialTweet(groupedItems, chainName);

  return (
    <div className="w-full bg-light-panel rounded-xl shadow-2xl border border-border/60 overflow-hidden">
      <div className="mb-6 md:mb-8 px-4 md:px-6 pt-4 md:pt-6">
        <h1 className="mb-6 text-lg md:text-2xl font-bold tracking-tight text-gradient animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {chainName.charAt(0).toUpperCase() + chainName.slice(1).toLowerCase()}{" "}
          Weekly News
          {Object.values(groupedItems)[0]?.[0]?.publishedAt && (
            <span className="text-base md:text-lg font-normal text-muted-foreground ml-2">
              — {new Date(Object.values(groupedItems)[0][0].publishedAt!.toString()).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          )}
        </h1>
      </div>

      {Object.entries(groupedItems).length > 0 ? (
        Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="mb-6 md:mb-8">
            <div className="relative ms-4 md:ms-6">
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-gradient">
                {category}
              </h2>
              <div className="absolute -bottom-2 left-0 w-16 md:w-24 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
            </div>

            <NewsList items={items} category={category} />
          </div>
        ))
      ) : (
        <div className="p-4 md:p-6">
          <p className="text-muted-foreground">No news found for this week.</p>
        </div>
      )}
    </div>
  );
};

export default WeeklyNewsContent;
