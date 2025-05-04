import React from "react";
import { Bitcoin, Cpu, Leaf } from "lucide-react";
import { ChainOption } from "@/app/types";

// Chain icons configuration
export const chainOptions: ChainOption[] = [
  {
    id: "ethereum",
    name: "Ethereum",
    logo: <Cpu className="h-4 w-4 text-purple-600" />,
  },
  {
    id: "solana",
    name: "Solana",
    logo: <Leaf className="h-4 w-4 text-green-600" />,
  },
  {
    id: "bitcoin",
    name: "Bitcoin",
    logo: <Bitcoin className="h-4 w-4 text-orange-500" />,
  },
];

// Get chain option by ID
export const getChainById = (id: string): ChainOption => {
  return chainOptions.find((chain) => chain.id === id) || chainOptions[0];
};
