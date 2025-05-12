"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { ChainType, getChainInfo, ChainInfo } from "@/lib/chain-utils";

interface ChainContextType {
  currentChain: ChainType;
  chainInfo: ChainInfo;
  setChain: (chain: ChainType) => void;
}

const defaultChain: ChainType = "ETHEREUM";
const defaultChainInfo = getChainInfo(defaultChain);

const ChainContext = createContext<ChainContextType>({
  currentChain: defaultChain,
  chainInfo: defaultChainInfo,
  setChain: () => {},
});

export const useChain = () => useContext(ChainContext);

export const ChainProvider = ({ children }: { children: ReactNode }) => {
  const [currentChain, setCurrentChain] = useState<ChainType>(defaultChain);
  const pathname = usePathname();

  useEffect(() => {
    // Check if current path contains a chain identifier
    if (pathname) {
      const pathSegments = pathname.split("/");
      if (pathSegments.length > 1) {
        const possibleChain = pathSegments[1]?.toUpperCase();
        if (["ETHEREUM", "SOLANA", "BITCOIN"].includes(possibleChain)) {
          setCurrentChain(possibleChain as ChainType);
          return;
        }
      }
    }

    // Default to Ethereum if no chain is detected
    setCurrentChain(defaultChain);
  }, [pathname]);

  const chainInfo = getChainInfo(currentChain);

  const setChain = (chain: ChainType) => {
    setCurrentChain(chain);
  };

  return (
    <ChainContext.Provider value={{ currentChain, chainInfo, setChain }}>
      {children}
    </ChainContext.Provider>
  );
};

export default ChainContext;
