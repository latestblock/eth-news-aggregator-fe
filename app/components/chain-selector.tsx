"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChainOption } from "@/app/types";
import { cn } from "@/lib/utils";

interface ChainSelectorProps {
  chains: ChainOption[];
  currentChain: string;
}

export default function ChainSelector({
  chains,
  currentChain,
}: ChainSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();

  const activeChain =
    chains.find((chain) => chain.id === currentChain) || chains[0];

  const handleChainChange = (chainId: string, disabled: boolean) => {
    if (disabled) return; // Don't navigate if chain is disabled
    router.push(`/${chainId}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full border border-border group transition-all duration-300 hover:scale-[1.02]",
            "relative overflow-hidden",
            "before:absolute before:inset-0 before:bg-primary/5 before:opacity-0 before:transition-opacity before:duration-300",
            "hover:before:opacity-100"
          )}
        >
          <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 opacity-100" />
          <span className="relative mr-1 p-1 rounded-full bg-background/50 transition-transform duration-300 group-hover:scale-110">
            {activeChain.logo}
          </span>
          <span className="relative font-medium">{activeChain.name}</span>
          <ChevronDown className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-48 animate-in fade-in-0 zoom-in-95"
      >
        {chains.map((chain) => (
          <DropdownMenuItem
            key={chain.id}
            className={cn(
              "flex items-center gap-2 transition-all duration-300",
              chain.id === currentChain
                ? "bg-primary/5 dark:bg-primary/10 font-medium"
                : "hover:bg-accent/50",
              chain.disabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            )}
            onClick={() => handleChainChange(chain.id, !!chain.disabled)}
            disabled={!!chain.disabled}
          >
            <span className="p-1 rounded-full bg-background/50">
              {chain.logo}
            </span>
            <span>{chain.name}</span>
            {chain.disabled && (
              <span className="ml-auto text-[10px] text-muted-foreground">
                (Coming soon)
              </span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
