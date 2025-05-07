import React from "react";
import { ChainOption, Chain } from "@/app/types";
import { EthereumIcon, BitcoinIcon, SolanaIcon } from "@/assets";

// Chain icons configuration
export const chainOptions: ChainOption[] = [
  {
    id: Chain.ETHEREUM,
    name: "Ethereum",
    shortName: "ETH",
    logo: <EthereumIcon className="h-4 w-4" />,
    disabled: false,
  },
  {
    id: Chain.SOLANA,
    name: "Solana",
    shortName: "SOL",
    logo: <SolanaIcon className="h-4 w-4" />,
    disabled: true,
  },
  {
    id: Chain.BITCOIN,
    name: "Bitcoin",
    shortName: "BTC",
    logo: <BitcoinIcon className="h-4 w-4" />,
    disabled: true,
  },
];

// Get chain option by ID
export const getChainById = (id: string): ChainOption => {
  return chainOptions.find((chain) => chain.id === id) || chainOptions[0];
};
