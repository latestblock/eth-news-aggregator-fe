import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeekItem } from "./week-item";
import { NewsGroup } from "@/app/types";

type MonthData = NewsGroup["months"][number];

interface MonthItemProps {
  year: number;
  month: number;
  yearMonth: string;
  isExpanded: boolean;
  onToggle: (yearMonth: string) => void;
  months: MonthData[];
  pathname: string;
  router: any;
}

export function MonthItem({
  year,
  month,
  yearMonth,
  isExpanded,
  onToggle,
  months,
  pathname,
  router,
}: MonthItemProps) {
  return (
    <div key={yearMonth}>
      <Button
        variant="ghost"
        className="w-full justify-start rounded px-2 py-1.5 text-left text-xs font-normal text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
        onClick={() => onToggle(yearMonth)}
      >
        {isExpanded ? (
          <ChevronDown className="mr-1.5 h-3 w-3 text-neutral-500" />
        ) : (
          <ChevronRight className="mr-1.5 h-3 w-3 text-neutral-500" />
        )}
        {new Date(year, month - 1).toLocaleString("default", {
          month: "long",
        })}
      </Button>
      {isExpanded && (
        <div className="space-y-0.5 py-0.5">
          {months
            .find((m) => m.month === month)
            ?.weeks.map(({ week }) => (
              <WeekItem
                key={`${yearMonth}-${week}`}
                year={year}
                month={month}
                week={week}
                pathname={pathname}
                router={router}
              />
            ))}
        </div>
      )}
    </div>
  );
}
