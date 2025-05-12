"use client";

import React from "react";
import { ChainType, getChainInfo } from "@/lib/chain-utils";
import { useChain } from "@/app/context/chain-context";

interface InlineLoaderProps {
  size?: "sm" | "md";
  message?: string;
  showMessage?: boolean;
  chain?: ChainType;
}

const InlineLoader = ({
  size = "sm",
  message = "Loading...",
  showMessage = true,
  chain: propChain,
}: InlineLoaderProps) => {
  // Use the chain context, but allow prop override
  const { chainInfo } = useChain();

  // Get chain info based on prop chain or from context
  const { color, IconComponent } = propChain
    ? getChainInfo(propChain)
    : chainInfo;

  const sizeClasses = {
    sm: {
      container: "w-6 h-6",
      icon: 12,
    },
    md: {
      container: "w-10 h-10",
      icon: 16,
    },
  };

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div
          className={`${sizeClasses[size].container} rounded-full border-2 border-slate-200 dark:border-slate-800 animate-spin`}
          style={{ borderTopColor: color }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <IconComponent
            width={sizeClasses[size].icon}
            height={sizeClasses[size].icon}
            className="opacity-70"
          />
        </div>
      </div>

      {showMessage && (
        <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
          {message}
        </p>
      )}
    </div>
  );
};

export default InlineLoader;
