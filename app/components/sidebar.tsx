"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface SidebarProps {
  newsGroups: NewsGroup[];
}

export function Sidebar({ newsGroups }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedYears, setExpandedYears] = useState<number[]>([]);
  const [expandedMonths, setExpandedMonths] = useState<string[]>([]);

  useEffect(() => {
    const currentDate = new Date();
    const recentMonths: string[] = [];
    const recentYears: number[] = [];

    for (let i = 0; i < 3; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i);
      const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`;
      recentMonths.push(yearMonth);
      if (!recentYears.includes(date.getFullYear())) {
        recentYears.push(date.getFullYear());
      }
    }

    setExpandedMonths(recentMonths);
    setExpandedYears(recentYears);
  }, []);

  const toggleYear = (year: number) => {
    setExpandedYears(prev =>
      prev.includes(year)
        ? prev.filter(y => y !== year)
        : [...prev, year]
    );
  };

  const toggleMonth = (yearMonth: string) => {
    setExpandedMonths(prev =>
      prev.includes(yearMonth)
        ? prev.filter(ym => ym !== yearMonth)
        : [...prev, yearMonth]
    );
  };

  const isYearExpanded = (year: number) => expandedYears.includes(year);
  const isMonthExpanded = (yearMonth: string) => expandedMonths.includes(yearMonth);

  return (
    <div className="w-64 border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="px-2 py-3">
          {newsGroups.map(({ year, months }) => (
            <div key={year} className="mb-1">
              <Button
                variant="ghost"
                className="w-full justify-start rounded px-2 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                onClick={() => toggleYear(year)}
              >
                {isYearExpanded(year) ? (
                  <ChevronDown className="mr-1.5 h-3 w-3 text-neutral-500" />
                ) : (
                  <ChevronRight className="mr-1.5 h-3 w-3 text-neutral-500" />
                )}
                {year}
              </Button>
              {isYearExpanded(year) && (
                <div className="ml-3 mt-0.5 space-y-0.5">
                  {months.map(({ month }) => {
                    const yearMonth = `${year}-${month}`;
                    return (
                      <div key={yearMonth}>
                        <Button
                          variant="ghost"
                          className="w-full justify-start rounded px-2 py-1.5 text-left text-xs font-normal text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                          onClick={() => toggleMonth(yearMonth)}
                        >
                          {isMonthExpanded(yearMonth) ? (
                            <ChevronDown className="mr-1.5 h-3 w-3 text-neutral-500" />
                          ) : (
                            <ChevronRight className="mr-1.5 h-3 w-3 text-neutral-500" />
                          )}
                          {new Date(year, month - 1).toLocaleString("default", {
                            month: "long",
                          })}
                        </Button>
                        {isMonthExpanded(yearMonth) && (
                          <div className="space-y-0.5 py-0.5">
                            {months
                              .find(m => m.month === month)
                              ?.weeks.map(({ week }) => (
                                <Button
                                  key={`${yearMonth}-${week}`}
                                  variant="ghost"
                                  className={cn(
                                    "ml-5 w-[calc(100%-1.25rem)] justify-start rounded px-2 py-1.5 text-left text-xs",
                                    pathname === `/news/${year}/${month}/${week}`
                                      ? "bg-emerald-50 font-medium text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50"
                                      : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
                                  )}
                                  onClick={() =>
                                    router.push(`/news/${year}/${month}/${week}`)
                                  }
                                >
                                  Week {week}
                                </Button>
                              ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}