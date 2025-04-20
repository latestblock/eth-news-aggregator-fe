import { Button } from "@/components/ui/button";
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
  return (
    <Button
      variant="ghost"
      className={cn(
        "ml-5 w-[calc(100%-1.25rem)] justify-start rounded px-2 py-1.5 text-left text-xs",
        pathname === `/news/${year}/${month}/${week}`
          ? "bg-emerald-50 font-medium text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 dark:hover:bg-emerald-900/50"
          : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
      )}
      onClick={() => router.push(`/news/${year}/${month}/${week}`)}
    >
      Week {week}
    </Button>
  );
}
