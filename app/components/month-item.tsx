import { ChevronDown, ChevronRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { WeekItem } from "./week-item";
import { NewsGroup, Chain } from "@/app/types";

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
  chainId?: Chain;
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
  chainId = Chain.ETHEREUM,
}: MonthItemProps) {
  return (
    <div key={yearMonth}>
      <button
        onClick={() => onToggle(yearMonth)}
        className="flex items-center w-full p-2 text-sm hover:bg-accent/40 rounded-lg text-left transition-all duration-300 group"
      >
        <span className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
          {isExpanded ? (
            <ChevronDown className="h-3.5 w-3.5 mr-1.5" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 mr-1.5" />
          )}
        </span>
        <Calendar
          color="#5873A7"
          className="h-3.5 w-3.5 mr-1.5 text-gradient group-hover:opacity-100 transition-all duration-300"
        />
        <span className="group-hover:text-primary transition-colors duration-300">
          {new Date(year, month - 1).toLocaleString("default", {
            month: "long",
          })}
        </span>
      </button>

      {isExpanded && (
        <div className="pl-8 space-y-1 mt-1 animate-in slide-in-from-left-2 duration-200">
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
                chainId={chainId}
              />
            ))}
        </div>
      )}
    </div>
  );
}
