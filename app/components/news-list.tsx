"use client";

import React, { useEffect } from "react";
import {
  ExternalLink,
  Share2,
  Calendar,
  Twitter,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NewsItem } from "../types";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface NewsListProps {
  items: NewsItem[];
  category?: string;
}

export function NewsList({ items, category }: NewsListProps) {
  const { toast } = useToast();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  const copyNewsLink = (item: NewsItem, index: number) => {
    const categorySlug = category?.toLowerCase().replace(/\s+/g, '-') || 'news';
    const url = `${window.location.origin}${window.location.pathname}#${categorySlug}-${index + 1}`;
    navigator.clipboard.writeText(url);
    toast({
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>Link copied to clipboard!</span>
        </div>
      ),
    });
  };

  const shareNews = (item: NewsItem) => {
    const text = `${item.headline} - Read more about Ethereum news`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(item.link)}`,
      "_blank"
    );
  };

  const shareToTelegram = (item: NewsItem) => {
    const text = item.headline;
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        item.link
      )}&text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const shareWeeklyNews = () => {
    const text = `${
      category || "Weekly"
    } Blockchain News - Check out the latest updates`;
    const url = window.location.href;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`,
      "_blank"
    );
  };

  const shareWeeklyNewsToTelegram = () => {
    const text = `${category || "Weekly"} Blockchain News`;
    const url = window.location.href;
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const handleWeeklyNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${category || "Weekly"} Blockchain News`,
          text: `Check out the latest ${
            category?.toLowerCase() || "weekly"
          } blockchain news updates`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      shareWeeklyNews();
    }
  };

  return (
    <div className="bg-light-panel px-3 sm:px-4 md:px-6 py-4 md:py-8">
      <Toaster />
      <div className="mx-auto max-w-4xl" style={{ width: "100%" }}>
        <div className="mb-4 md:mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="mr-2 h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
            <p className="text-xs md:text-sm text-muted-foreground">
              {items[0] &&
                new Date(items[0].date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
            </p>
          </div>
          <div className="flex items-center gap-1 md:gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 md:h-9 md:w-auto px-1 md:px-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors duration-300"
              onClick={shareWeeklyNews}
            >
              <Twitter className="h-3 w-3 md:h-4 md:w-4 md:mr-1" />
              <span className="sr-only md:not-sr-only md:inline text-xs">
                Share on Twitter
              </span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 md:h-9 md:w-auto px-1 md:px-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors duration-300"
              onClick={shareWeeklyNewsToTelegram}
            >
              <MessageCircle className="h-3 w-3 md:h-4 md:w-4 md:mr-1" />
              <span className="sr-only md:not-sr-only md:inline text-xs">
                Share on Telegram
              </span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 md:h-9 md:w-auto px-1 md:px-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors duration-300"
              onClick={handleWeeklyNativeShare}
            >
              <Share2 className="h-3 w-3 md:h-4 md:w-4 md:mr-1" />
              <span className="sr-only md:not-sr-only md:inline text-xs">
                Share
              </span>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:gap-6">
          {items.map((item, index) => {
            const categorySlug = category?.toLowerCase().replace(/\s+/g, '-') || 'news';
            const itemId = `${categorySlug}-${index + 1}`;
            
            return (
              <div
                key={item.id}
                id={itemId}
                className="group glass-card rounded-xl p-3 sm:p-4 md:p-6 transition-all duration-500 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-2 scroll-mt-20"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h3 className="text-base md:text-lg font-medium mb-2 md:mb-4 group-hover:text-primary transition-colors duration-300">
                    {item.headline}
                  </h3>
                </a>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3 md:mb-4">
                  {item.summary}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2 md:mt-4">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>Source: </span>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 flex items-center text-primary/80 hover:text-primary transition-colors duration-300 group/link"
                    >
                      {new URL(item.link).hostname.replace("www.", "")}
                      <ExternalLink className="ml-1 h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </div>

                  <div className="flex items-center gap-1 md:gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 md:h-9 md:w-auto px-1 md:px-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                      onClick={() => shareNews(item)}
                    >
                      <Twitter className="h-3 w-3 md:h-4 md:w-4 md:mr-1" />
                      <span className="sr-only md:not-sr-only md:inline text-xs">
                        Twitter
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 md:h-9 md:w-auto px-1 md:px-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                      onClick={() => shareToTelegram(item)}
                    >
                      <MessageCircle className="h-3 w-3 md:h-4 md:w-4 md:mr-1" />
                      <span className="sr-only md:not-sr-only md:inline text-xs">
                        Telegram
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 md:h-9 md:w-auto px-1 md:px-2 rounded-full hover:bg-primary/10 hover:text-primary transition-colors duration-300"
                      onClick={() => copyNewsLink(item, index)}
                    >
                      <Share2 className="h-3 w-3 md:h-4 md:w-4 md:mr-1" />
                      <span className="sr-only md:not-sr-only md:inline text-xs">
                        Share
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
