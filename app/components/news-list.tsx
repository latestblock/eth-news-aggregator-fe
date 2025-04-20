"use client";

import { ExternalLink, Share2, Calendar } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NewsItem } from "../types";

interface NewsListProps {
  items: NewsItem[];
}

export function NewsList({ items }: NewsListProps) {
  const shareNews = (item: NewsItem) => {
    const text = `${item.headline} - Read more about Ethereum news`;
    const url = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50 px-6 py-4 dark:bg-neutral-900">
      <div className="mx-auto max-w-3xl">
        <div className="mb-4 flex items-center">
          <Calendar className="mr-2 h-4 w-4 text-neutral-400" />
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {items[0] &&
              new Date(items[0].date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
          </p>
        </div>
        <div className="space-y-3">
          {items.map((item) => (
            <Card
              key={item.id}
              className="border border-neutral-200/75 bg-white shadow-none transition hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
            >
              <Accordion type="single" collapsible>
                <AccordionItem value={item.id} className="border-none">
                  <AccordionTrigger className="px-4 py-3 text-left hover:no-underline [&[data-state=open]>div]:text-emerald-600 dark:[&[data-state=open]>div]:text-emerald-400">
                    <div className="text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-200">
                      {item.headline}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="border-t border-neutral-100 px-4 pb-3 pt-2 dark:border-neutral-800">
                      <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                        {item.summary}
                      </p>
                      <div className="mt-3 flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 rounded border border-neutral-200 px-2.5 text-xs font-normal text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                          onClick={() => window.open(item.link, "_blank")}
                        >
                          <ExternalLink className="mr-1.5 h-3 w-3" />
                          Read More
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 rounded border border-neutral-200 px-2.5 text-xs font-normal text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
                          onClick={() => shareNews(item)}
                        >
                          <Share2 className="mr-1.5 h-3 w-3" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
