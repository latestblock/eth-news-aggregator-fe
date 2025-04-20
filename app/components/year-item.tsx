import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MonthItem } from "./month-item";
import { NewsGroup } from "@/app/types";

type MonthData = NewsGroup["months"][number];

interface YearItemProps {
  year: number;
  months: MonthData[];
  isExpanded: boolean;
  onToggle: (year: number) => void;
  expandedMonths: string[];
  toggleMonth: (yearMonth: string) => void;
  pathname: string;
  router: any;
}

export function YearItem({
  year,
  months,
  isExpanded,
  onToggle,
  expandedMonths,
  toggleMonth,
  pathname,
  router,
}: YearItemProps) {
  return (
    <div className="mb-1">
      <Button
        variant="ghost"
        className="w-full justify-start rounded px-2 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
        onClick={() => onToggle(year)}
      >
        {isExpanded ? (
          <ChevronDown className="mr-1.5 h-3 w-3 text-neutral-500" />
        ) : (
          <ChevronRight className="mr-1.5 h-3 w-3 text-neutral-500" />
        )}
        {year}
      </Button>
      {isExpanded && (
        <div className="ml-3 mt-0.5 space-y-0.5">
          {months.map(({ month }) => {
            const yearMonth = `${year}-${month}`;
            return (
              <MonthItem
                key={yearMonth}
                year={year}
                month={month}
                yearMonth={yearMonth}
                isExpanded={expandedMonths.includes(yearMonth)}
                onToggle={toggleMonth}
                months={months}
                pathname={pathname}
                router={router}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
