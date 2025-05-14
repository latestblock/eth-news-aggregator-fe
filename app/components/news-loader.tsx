"use client";

import { useEffect } from "react";
import { useLoading } from "@/app/context/loading-context";
import { NewsItem } from "@/app/types";

interface NewsLoaderProps {
  newsItems: any;
}

export function NewsLoader({ newsItems }: NewsLoaderProps) {
  const { setIsLoading } = useLoading();
  console.log("newsItems: ", newsItems);

  useEffect(() => {
    // Set loading to false if news items exist
    if (newsItems && newsItems.length > 0) {
      setIsLoading(false);
    }
  }, [newsItems, setIsLoading]);

  // This component doesn't render anything
  return null;
}
