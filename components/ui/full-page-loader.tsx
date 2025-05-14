"use client";

import React, { memo } from "react";
import { ChainType, getChainInfo } from "@/lib/chain-utils";
import { useChain } from "@/app/context/chain-context";

interface FullPageLoaderProps {
  title?: string;
  subtitle?: string;
  chain?: ChainType;
  isLoading?: boolean;
}

const FullPageLoader = ({
  title,
  subtitle = "Loading the latest blockchain news...",
  chain: propChain,
  isLoading = true,
}: FullPageLoaderProps) => {
  const { chainInfo } = useChain();

  const { name, color, IconComponent } = propChain
    ? getChainInfo(propChain)
    : chainInfo;

  const displayTitle = title || "Latest Block";

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-[1000]">
      <div className="flex flex-col items-center justify-center gap-6 px-4">
        <div className="relative">
          {/* Outer glow effect */}
          <div
            className="absolute -inset-4 rounded-full blur-xl animate-pulse"
            style={{ backgroundColor: `${color}20` }} // 20 for 12% opacity
          ></div>

          {/* Spinner */}
          <div
            className="relative w-20 h-20 rounded-full border-4 border-slate-200/30 dark:border-slate-800/30 animate-spin"
            style={{
              borderTopColor: color,
              borderLeftColor: `${color}B3`, // B3 for 70% opacity
            }}
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <IconComponent width={28} height={28} className="opacity-80" />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          <h3 className="text-xl font-bold text-foreground">{displayTitle}</h3>
          <p className="text-sm text-muted-foreground mt-2 animate-pulse">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

export default memo(FullPageLoader);
