import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MonthItem } from "./month-item";
import { NewsGroup, Chain } from "@/app/types";

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
  chainId?: Chain;
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
  chainId = Chain.ETHEREUM,
}: YearItemProps) {
  return (
    <div className="border-b border-border/40 pb-2">
      <button
        onClick={() => onToggle(year)}
        className="flex items-center w-full p-2 hover:bg-accent/40 rounded-lg text-left transition-all duration-300 group"
      >
        <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 mr-1" />
          ) : (
            <ChevronRight className="h-4 w-4 mr-1" />
          )}
        </span>
        <span className="font-bold group-hover:text-primary transition-colors duration-300">
          {year}
        </span>
      </button>

      {isExpanded && (
        <div className="pl-4 space-y-1 mt-1 animate-in slide-in-from-left-2 duration-200">
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
                chainId={chainId}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
