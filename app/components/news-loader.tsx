"use client";

import { memo, useEffect } from "react";
import { useLoading } from "@/app/context/loading-context";

interface NewsLoaderProps {
  newsItems: any;
  error?: {
    message: string;
    statusCode?: number;
  };
}

export const NewsLoaderComponent = ({ newsItems, error }: NewsLoaderProps) => {
  const { setIsLoading } = useLoading();

  useEffect(() => {
    if ((newsItems && newsItems.length > 0) || error) {
      setIsLoading(false);
    }
  }, [newsItems, error, setIsLoading]);

  return null;
};

export const NewsLoader = memo(NewsLoaderComponent);
