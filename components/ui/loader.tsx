"use client";

import React from "react";
import { ChainType, getChainInfo } from "@/lib/chain-utils";
import { useChain } from "@/app/context/chain-context";

interface LoaderProps {
  message?: string;
  fullScreen?: boolean;
  chain?: ChainType;
}

const Loader = ({
  message = "Loading latest news...",
  fullScreen = true,
  chain: propChain,
}: LoaderProps) => {
  // Use the chain context, but allow prop override
  const { chainInfo } = useChain();

  // Get chain info based on prop chain or from context
  const { color, IconComponent } = propChain
    ? getChainInfo(propChain)
    : chainInfo;

  return (
    <div
      className={`flex flex-col items-center justify-center ${
        fullScreen ? "h-screen w-full" : "min-h-[200px] w-full"
      }`}
    >
      <div className="relative">
        <div
          className="w-16 h-16 rounded-full border-4 border-slate-200 dark:border-slate-800 animate-spin"
          style={{ borderTopColor: color }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <IconComponent width={20} height={20} className="opacity-70" />
        </div>
      </div>

      <p className="text-slate-600 dark:text-slate-300 mt-4 text-sm font-medium animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default Loader;
