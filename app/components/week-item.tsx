import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { Chain } from "@/app/types";

interface WeekItemProps {
  year: number;
  month: number;
  week: number;
  pathname: string;
  router: any;
  chainId?: Chain;
}

export function WeekItem({
  year,
  month,
  week,
  pathname,
  router,
  chainId = Chain.ETHEREUM,
}: WeekItemProps) {
  const chainPath = chainId.toLowerCase();
  const weekPath = `/${chainPath}/news/${year}/${month}/${week}`;
  const isActive = pathname === weekPath;

  // Calculate date range for the week
  const getDateRangeForWeek = () => {
    // Create date for the first day of the month
    const firstDayOfMonth = new Date(year, month - 1, 1);

    // Calculate the start date of the week (1-based week)
    const startDay = (week - 1) * 7 + 1;
    const startDate = new Date(year, month - 1, startDay);

    // Calculate the end date (start + 6 days)
    const endDate = new Date(year, month - 1, startDay + 6);

    // Handle edge cases where week extends to next month
    if (endDate.getMonth() !== month - 1) {
      // If end date is in next month, use last day of current month
      endDate.setDate(0); // Last day of previous month
    }

    // Format dates: "Month Day - Month Day"
    const startMonth = startDate.toLocaleString("default", { month: "short" });
    const endMonth = endDate.toLocaleString("default", { month: "short" });

    if (startMonth === endMonth) {
      return `${startMonth} ${startDate.getDate()} - ${endDate.getDate()}`;
    } else {
      return `${startMonth} ${startDate.getDate()} - ${endMonth} ${endDate.getDate()}`;
    }
  };

  return (
    <button
      onClick={() => router.push(weekPath)}
      className={cn(
        "flex items-center w-full p-1.5 text-sm hover:bg-accent/40 rounded-lg text-left transition-all duration-300 group",
        isActive ? "bg-primary/10 text-primary" : "hover:text-primary"
      )}
    >
      <FileText className="h-3 w-3 mr-1.5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
      <span className="truncate text-xs">{getDateRangeForWeek()}</span>
    </button>
  );
}
