"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { chainOptions } from "@/app/components/chain-icons";
import ChainSelector from "../chain-selector";
import ThemeToggle from "@/components/ui/theme-toggle";
import { Chain } from "@/app/types";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Extract the chain from the pathname
  let currentChain = chainOptions[0].id;
  const pathParts = pathname.split("/").filter(Boolean);

  if (pathParts.length > 0) {
    const pathChain = pathParts[0].toUpperCase();
    if (Object.values(Chain).includes(pathChain as Chain)) {
      currentChain = pathChain as Chain;
    }
  }

  // Function to toggle the mobile sidebar
  const toggleSidebar = () => {
    if (typeof window !== "undefined" && (window as any).__mobileSidebar) {
      (window as any).__mobileSidebar.toggle();
      setIsSidebarOpen(!(window as any).__mobileSidebar.isOpen);
    }
  };

  // Sync with the actual sidebar state
  useEffect(() => {
    const syncSidebarState = () => {
      if (typeof window !== "undefined" && (window as any).__mobileSidebar) {
        setIsSidebarOpen((window as any).__mobileSidebar.isOpen);
      }
    };

    // Check initial state
    syncSidebarState();

    // Set up interval to check for changes
    const interval = setInterval(syncSidebarState, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 z-50 inset-x-0">
      <div className="mx-auto w-full max-w-screen-xl border-b border-border bg-background shadow-md">
        <div className="h-16 flex items-center justify-between px-3 sm:px-6">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="min-[981px]:hidden h-8 w-8"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              {isSidebarOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
            <h1 className="text-lg sm:text-xl md:text-2xl text-gradient font-semibold tracking-wide">
              Latest Block
            </h1>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            {/* <ChainloSelector chains={chainOptions} currentChain={currentChain} /> */}
            <ThemeToggle className="h-8 w-8 sm:h-9 sm:w-9" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
