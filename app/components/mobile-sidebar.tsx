"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "./sidebar";
import { cn } from "@/lib/utils";
import { NewsGroup, Chain } from "@/app/types";

interface MobileSidebarProps {
  newsGroups: NewsGroup[];
  chainId?: Chain;
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileSidebar({
  newsGroups,
  chainId = Chain.ETHEREUM,
  isOpen,
  onToggle,
}: MobileSidebarProps) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onToggle}
      />

      <div
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-[85vw] max-w-[300px] bg-background shadow-xl md:hidden transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="pt-20 h-full">
          <Sidebar newsGroups={newsGroups} chainId={chainId} />
        </div>
      </div>
    </>
  );
}
