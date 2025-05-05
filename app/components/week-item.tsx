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

  return (
    <button
      onClick={() => router.push(weekPath)}
      className={cn(
        "flex items-center w-full p-1.5 text-sm hover:bg-accent/40 rounded-lg text-left transition-all duration-300 group",
        isActive ? "bg-primary/10 text-primary" : "hover:text-primary"
      )}
    >
      <FileText className="h-3 w-3 mr-1.5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
      <span className="truncate text-xs">Week {week}</span>
    </button>
  );
}
