import { NewsList } from "@/app/components/news-list";
import { NewsItem } from "@/app/types";

type WeeklyNewsContentProps = {
  dateRangeTitle: string;
  groupedItems: Record<string, NewsItem[]>;
};

export const WeeklyNewsContent = (props: WeeklyNewsContentProps) => {
  const { dateRangeTitle, groupedItems } = props;
  return (
    <div className="flex-1">
      <h1 className="text-2xl font-bold mb-6 px-6 pt-6">
        Ethereum News: {dateRangeTitle}
      </h1>

      {Object.entries(groupedItems).length > 0 ? (
        Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 px-6">{category}</h2>
            <NewsList items={items} />
          </div>
        ))
      ) : (
        <div className="p-6">
          <p className="text-neutral-500">No news found for this week.</p>
        </div>
      )}
    </div>
  );
};

export default WeeklyNewsContent;
