import { NewsList } from "@/app/components/news-list";
import { NewsItem } from "@/app/types";

type WeeklyNewsContentProps = {
  dateRangeTitle: string;
  groupedItems: Record<string, NewsItem[]>;
};

export const WeeklyNewsContent = (props: WeeklyNewsContentProps) => {
  const { dateRangeTitle, groupedItems } = props;
  return (
    <div className="w-fit bg-light-panel rounded-xl">
      <div className="mb-6 px-6 pt-6">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-gradient animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Ethereum Weekly News
        </h1>

        <h1 className="text-md font-bold tracking-tight text-gradient animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {dateRangeTitle}
        </h1>
      </div>

      {Object.entries(groupedItems).length > 0 ? (
        Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="mb-8">
            <div className="relative ms-6">
              <h2 className="text-2xl font-semibold tracking-tight text-gradient">
                {category}
              </h2>
              <div className="absolute -bottom-2 left-0 w-24 h-0.5 bg-gradient-to-r from-primary to-transparent"></div>
            </div>

            <NewsList items={items} />
          </div>
        ))
      ) : (
        <div className="p-6">
          <p className="text-muted-foreground">No news found for this week.</p>
        </div>
      )}
    </div>
  );
};

export default WeeklyNewsContent;
