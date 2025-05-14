"use client";

import React, { memo } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ErrorDisplayProps {
  message: string;
  statusCode?: number;
}

const ErrorDisplayComponent = ({ message, statusCode }: ErrorDisplayProps) => {
  return (
    <div className="w-full flex items-center justify-center py-12 px-4">
      <div className="bg-background border border-border rounded-lg p-6 max-w-md w-full shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-full bg-red-100 dark:bg-red-900/30 p-2">
            <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">
            {statusCode ? `Error ${statusCode}` : "Error"}
          </h2>
        </div>
        <p className="text-muted-foreground text-sm md:text-base">{message}</p>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => window.history.back()}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-full border border-border group transition-all duration-300 hover:scale-[1.02]",
              "relative overflow-hidden",
              "before:absolute before:inset-0 before:bg-primary/5 before:opacity-0 before:transition-opacity before:duration-300",
              "hover:before:opacity-100"
            )}
          >
            <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 opacity-100" />
            <span className="relative">Go Back to News Week</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const ErrorDisplay = memo(ErrorDisplayComponent);
