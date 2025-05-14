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
  const [expandedYear, setExpandedYear] = useState<number | null>(null);

  useEffect(() => {
    // Extract current year from pathname
    const match = pathname.match(/\/(\d+)\/(\d+)\/(\d+)$/);
    if (match) {
      const [, year] = match;
      setExpandedYear(parseInt(year));
    }
  }, [pathname]);

  const toggleYear = (year: number) => {
    setExpandedYear(current => current === year ? null : year);
  };

  const navigateToWeek = (year: number, month: number, week: number) => {
    const chainPath = chainId.toLowerCase();
    router.push(`/${chainPath}/news/${year}/${month}/${week}`);
  };

  const getWeekDates = (year: number, month: number, week: number) => {
    const startDay = new Date(year, month - 1, (week - 1) * 7 + 1);
    return startDay.toLocaleString('default', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="w-24 h-full rounded-xl bg-light-panel">
      <ScrollArea className="h-[calc(100vh-6rem)]">
        <div className="flex flex-col items-center py-3 space-y-4">
          {newsGroups.map(({ year, months }) => {
            const isExpanded = expandedYear === year;
            const isCurrentYear = pathname.includes(`/${year}/`);
            
            return (
              <div key={year} className="flex flex-col items-center space-y-2">
                <button
                  onClick={() => toggleYear(year)}
                  className={cn(
                    "text-sm font-semibold text-muted-foreground hover:text-primary transition-colors",
                    (isExpanded || isCurrentYear) && "text-primary"
                  )}
                >
                  {year}
                </button>
                {(isExpanded || isCurrentYear) && (
                  <div className="flex flex-col items-center space-y-1">
                    {months.flatMap(({ month, weeks }) =>
                      weeks.map(({ week }) => {
                        const weekPath = `/${chainId.toLowerCase()}/news/${year}/${month}/${week}`;
                        const isActive = pathname === weekPath;
                        return (
                          <Button
                            key={`${month}-${week}`}
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
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
