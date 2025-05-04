import { FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface WeekItemProps {
  year: number;
  month: number;
  week: number;
  pathname: string;
  router: any;
}

export function WeekItem({
  year,
  month,
  week,
  pathname,
  router,
}: WeekItemProps) {
  const isActive = pathname === `/news/${year}/${month}/${week}`;

  return (
    <button
      onClick={() => router.push(`/news/${year}/${month}/${week}`)}
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
