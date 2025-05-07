import { NewsList } from "@/app/components/news-list";
import { NewsItem, Chain } from "@/app/types";

type WeeklyNewsContentProps = {
  dateRangeTitle: string;
  groupedItems: Record<string, NewsItem[]>;
  chainName?: Chain;
};

export const WeeklyNewsContent = (props: WeeklyNewsContentProps) => {
  const { dateRangeTitle, groupedItems, chainName = Chain.ETHEREUM } = props;
  return (
    <div className="w-full bg-light-panel rounded-xl shadow-2xl border border-border/60 overflow-hidden">
      <div className="mb-4 md:mb-6 px-4 md:px-6 pt-4 md:pt-6">
        <h1 className="text-lg md:text-2xl font-bold tracking-tight text-gradient animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {chainName.charAt(0).toUpperCase() + chainName.slice(1).toLowerCase()}{" "}
          Weekly News
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
