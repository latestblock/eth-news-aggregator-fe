"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NewsGroup, Chain } from "@/app/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  newsGroups: NewsGroup[];
  chainId?: Chain;
}

export function Sidebar({
  newsGroups,
  chainId = Chain.ETHEREUM,
}: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedMonth, setExpandedMonth] = useState<string | null>(null);

  useEffect(() => {
    // Extract current year and month from pathname
    const match = pathname.match(/\/(\d+)\/(\d+)\/(\d+)$/);
    if (match) {
      const [, year, month] = match;
      setExpandedMonth(`${year}-${month}`);
    }
  }, [pathname]);

  const toggleMonth = (yearMonth: string) => {
    setExpandedMonth(prev => prev === yearMonth ? null : yearMonth);
  };

  const navigateToWeek = (year: number, month: number, week: number) => {
    const chainPath = chainId.toLowerCase();
    router.push(`/${chainPath}/news/${year}/${month}/${week}`);
  };

  const getWeekDates = (year: number, month: number, week: number) => {
    const startDay = new Date(year, month - 1, (week - 1) * 7 + 1);
    const endDay = new Date(year, month - 1, week * 7);
    
    // Handle edge case where week extends to next month
    if (endDay.getMonth() !== month - 1) {
      endDay.setDate(0); // Last day of the month
    }

    const startDate = startDay.getDate().toString().padStart(2, '0');
    const endDate = endDay.getDate().toString().padStart(2, '0');
    const startMonth = startDay.toLocaleString('default', { month: 'short' });
    const endMonth = endDay.toLocaleString('default', { month: 'short' });

    if (startMonth === endMonth) {
      return `${startDate}-${endDate}`;
    }
    return `${startDate}-${endDate}`;
  };

  return (
    <div className="w-24 h-full rounded-xl bg-light-panel">
      <ScrollArea className="h-[calc(100vh-6rem)]">
        <div className="flex flex-col items-center py-3 space-y-4">
          {newsGroups.map(({ year, months }) => (
            <div key={year} className="flex flex-col items-center space-y-2">
              <span className="text-sm font-semibold text-muted-foreground">{year}</span>
              {months.map(({ month, weeks }) => {
                const yearMonth = `${year}-${month}`;
                const isExpanded = expandedMonth === yearMonth;
                const weekPath = `/${chainId.toLowerCase()}/news/${year}/${month}/${weeks[0]?.week}`;
                const isCurrentMonth = pathname.startsWith(weekPath);
                
                return (
                  <div key={month} className="flex flex-col items-center space-y-1">
                    <button
                      onClick={() => toggleMonth(yearMonth)}
                      className={cn(
                        "text-xs text-muted-foreground hover:text-primary transition-colors",
                        (isExpanded || isCurrentMonth) && "text-primary"
                      )}
                    >
                      {new Date(year, month - 1).toLocaleString('default', { month: 'short' })}
                    </button>
                    {(isExpanded || isCurrentMonth) && (
                      <div className="flex flex-col items-center space-y-1 mt-1">
                        {weeks.map(({ week }) => {
                          const weekPath = `/${chainId.toLowerCase()}/news/${year}/${month}/${week}`;
                          const isActive = pathname === weekPath;
                          return (
                            <Button
                              key={week}
                              variant="ghost"
                              size="sm"
                              className={cn(
                                "h-6 w-16 p-0 text-xs hover:bg-accent",
                                isActive && "bg-primary/10 text-primary"
                              )}
                              onClick={() => navigateToWeek(year, month, week)}
                            >
                              {getWeekDates(year, month, week)}
                            </Button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
