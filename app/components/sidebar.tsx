"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { YearItem } from "./year-item";
import { NewsGroup, Chain } from "@/app/types";

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
  const [expandedYears, setExpandedYears] = useState<number[]>([]);
  const [expandedMonths, setExpandedMonths] = useState<string[]>([]);

  useEffect(() => {
    const currentDate = new Date();
    const recentMonths: string[] = [];
    const recentYears: number[] = [];

    for (let i = 0; i < 3; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i
      );
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
    setExpandedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const toggleMonth = (yearMonth: string) => {
    setExpandedMonths((prev) =>
      prev.includes(yearMonth)
        ? prev.filter((ym) => ym !== yearMonth)
        : [...prev, yearMonth]
    );
  };

  return (
    <div className="w-full md:w-64 h-full rounded-xl bg-light-panel">
      <ScrollArea className="h-[calc(100vh-6rem)]">
        <div className="px-2 py-3">
          {newsGroups.map(({ year, months }) => (
            <YearItem
              key={year}
              year={year}
              months={months}
              isExpanded={expandedYears.includes(year)}
              onToggle={toggleYear}
              expandedMonths={expandedMonths}
              toggleMonth={toggleMonth}
              pathname={pathname}
              router={router}
              chainId={chainId}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
