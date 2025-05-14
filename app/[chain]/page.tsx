import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Chain } from "@/app/types";
import { getDefaultChain, getDefaultChainRoute } from "@/app/utils/chainUtils";
import { chainOptions } from "@/app/components/chain-icons";
import { Metadata } from "next";
import { generateMetadata as generatePageMetadata } from "@/app/utils/generate-metadata";
import {
  getWeekNumberInMonth,
  getMostRecentReleaseDay,
} from "@/app/utils/dateUtils";
import FullPageLoader from "@/components/ui/full-page-loader";

type Props = {
  params: { chain?: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const chainParam = params.chain?.toUpperCase() || "";

  const chain = Object.values(Chain).includes(chainParam.toUpperCase() as Chain)
    ? (chainParam.toUpperCase() as Chain)
    : getDefaultChain();

  const formattedChainName =
    chain.charAt(0).toUpperCase() + chain.slice(1).toLowerCase();

  return generatePageMetadata({
    title: `${formattedChainName} News`,
    description: `Stay updated with the latest ${formattedChainName} blockchain news and developments.`,
    chain: chain,
  });
}

export default async function ChainHomePage({ params }: Props) {
  // Default to Ethereum if chain is not provided or invalid
  const chainParam = params.chain?.toUpperCase() || "";

  // Validate that the chain is a valid enum value
  const chain = Object.values(Chain).includes(chainParam.toUpperCase() as Chain)
    ? (chainParam.toUpperCase() as Chain)
    : getDefaultChain();

  // Check if the chain is disabled
  const chainOption = chainOptions.find((option) => option.id === chain);
  if (chainOption?.disabled) {
    // Redirect to Ethereum if the chain is disabled
    redirect(`/${getDefaultChainRoute()}`);
  }

  // First check if we have any news
  const anyNewsItem = await prisma.newsItem.findFirst({
    where: {
      date: {
        not: null,
      },
      status: "APPROVED",
      chain: chain as any,
    },
  });

  if (!anyNewsItem || !anyNewsItem.date) {
    return (
      <div className="text-2xl font-bold mb-6 px-6 pt-6">
        <h1 className="text-2xl font-bold mb-6 px-6 pt-6">
          Latest {chain.charAt(0).toUpperCase() + chain.slice(1).toLowerCase()}{" "}
          News
        </h1>
        <p>
          No news found for{" "}
          {chain.charAt(0).toUpperCase() + chain.slice(1).toLowerCase()}
        </p>
      </div>
    );
  }

  // Get the most recent release day (e.g., Sunday)
  const lastReleaseDay = getMostRecentReleaseDay();

  // Calculate year, month, and week for the latest release period
  const year = lastReleaseDay.getFullYear();
  const month = lastReleaseDay.getMonth() + 1; // Convert to 1-indexed month
  const week = getWeekNumberInMonth(lastReleaseDay);

  if (chain && year && month && week) {
    redirect(`/${chain.toLowerCase()}/news/${year}/${month}/${week}`);
  }

  return <FullPageLoader isLoading />;
}
