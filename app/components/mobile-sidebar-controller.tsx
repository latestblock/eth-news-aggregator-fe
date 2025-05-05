"use client";

import React, { useState, useEffect } from "react";
import { MobileSidebar } from "./mobile-sidebar";
import { NewsGroup, Chain } from "@/app/types";

interface MobileSidebarControllerProps {
  newsGroups: NewsGroup[];
  chainId?: Chain;
}

export function MobileSidebarController({
  newsGroups,
  chainId = Chain.ETHEREUM,
}: MobileSidebarControllerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).__mobileSidebar = {
        isOpen,
        toggle: toggleSidebar,
      };
    }

    return () => {
      if (typeof window !== "undefined") {
        delete (window as any).__mobileSidebar;
      }
    };
  }, [isOpen]);

  return (
    <MobileSidebar
      newsGroups={newsGroups}
      chainId={chainId}
      isOpen={isOpen}
      onToggle={toggleSidebar}
    />
  );
}
