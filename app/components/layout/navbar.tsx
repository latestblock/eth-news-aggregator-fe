import React from "react";
import { Newspaper } from "lucide-react";
import { chainOptions } from "@/app/components/chain-icons";
import ChainSelector from "../chain-selector";
import ThemeToggle from "@/components/ui/theme-toggle";

interface NavbarProps {}

const Navbar = ({}: NavbarProps) => {
  return (
    <header className="fixed shadow-md top-0 z-50 flex h-16 w-full items-center justify-between bg-background px-6 border-b border-border">
      <div className="flex items-center">
        <h1 className="text-2xl text-gradient font-semibold tracking-wide">
          Latest Block
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <ChainSelector
          chains={chainOptions}
          currentChain={chainOptions[0].id}
        />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Navbar;
