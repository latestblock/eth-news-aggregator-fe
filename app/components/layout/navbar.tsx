"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Newspaper } from "lucide-react";
import { chainOptions } from "@/app/components/chain-icons";
import ChainSelector from "../chain-selector";
import ThemeToggle from "@/components/ui/theme-toggle";
import { Chain } from "@/app/types";

const Navbar = () => {
  const pathname = usePathname();

  // Extract the chain from the pathname
  let currentChain = chainOptions[0].id;
  const pathParts = pathname.split("/").filter(Boolean);

  if (pathParts.length > 0) {
    const pathChain = pathParts[0].toUpperCase();
    if (Object.values(Chain).includes(pathChain as Chain)) {
      currentChain = pathChain as Chain;
    }
  }

  return (
    <header className="fixed shadow-md top-0 z-50 flex h-16 w-full items-center justify-between bg-background px-6 border-b border-border">
      <div className="flex items-center">
        <h1 className="text-2xl text-gradient font-semibold tracking-wide">
          Latest Block
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <ChainSelector chains={chainOptions} currentChain={currentChain} />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;
