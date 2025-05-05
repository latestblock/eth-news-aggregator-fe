import { Chain } from "@/app/types";

/**
 * Converts the app Chain enum to Prisma CHAIN enum string
 */
export function convertToPrismaChain(chain: Chain): string {
  return chain; // Both use the same string values
}

/**
 * Get default chain if none is provided
 */
export function getDefaultChain(): Chain {
  return Chain.ETHEREUM;
}
