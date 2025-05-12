import { EthereumIcon, SolanaIcon, BitcoinIcon } from "@/assets";

// Type definitions for chains
export type ChainType = "ETHEREUM" | "SOLANA" | "BITCOIN" | string;

// Chain information including colors and icons
export interface ChainInfo {
  name: string;
  color: string;
  secondaryColor?: string;
  IconComponent: React.ComponentType<{
    className?: string;
    height?: number;
    width?: number;
  }>;
}

// Get chain information based on chain name
export const getChainInfo = (chain?: ChainType): ChainInfo => {
  const chainName = chain?.toUpperCase() || "ETHEREUM";

  switch (chainName) {
    case "ETHEREUM":
      return {
        name: "Ethereum",
        color: "#627EEA",
        IconComponent: EthereumIcon,
      };
    case "SOLANA":
      return {
        name: "Solana",
        color: "#9945FF",
        IconComponent: SolanaIcon,
      };
    case "BITCOIN":
      return {
        name: "Bitcoin",
        color: "#F7931A",
        IconComponent: BitcoinIcon,
      };
    default:
      // Default to Ethereum if chain is not recognized
      return {
        name: "Ethereum",
        color: "#627EEA",
        IconComponent: EthereumIcon,
      };
  }
};

// Function to get current chain from URL path if applicable
export const getChainFromPath = (): ChainType | undefined => {
  if (typeof window === "undefined") {
    // Server-side, we can't detect the chain from path, return undefined
    return undefined;
  }

  try {
    const pathSegments = window.location.pathname.split("/");
    if (pathSegments.length > 1) {
      const possibleChain = pathSegments[1]?.toUpperCase();
      if (["ETHEREUM", "SOLANA", "BITCOIN"].includes(possibleChain)) {
        return possibleChain as ChainType;
      }
    }
  } catch (error) {
    // If there's any error parsing the path, return undefined
    console.error("Error parsing path for chain:", error);
  }

  return undefined;
};
