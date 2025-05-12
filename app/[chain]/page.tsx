import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Chain } from "@/app/types";
import { getDefaultChain, getDefaultChainRoute } from "@/app/utils/chainUtils";
import { chainOptions } from "@/app/components/chain-icons";
import { Metadata } from "next";
import { generateMetadata as generatePageMetadata } from "@/app/utils/generate-metadata";

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

  const latestNewsItem = await prisma.newsItem.findFirst({
    where: {
      date: {
        not: null,
      },
      status: "APPROVED",
      chain: chain as any,
    },
    orderBy: {
      date: "desc",
    },
  });

  if (!latestNewsItem || !latestNewsItem.date) {
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

  // Calculate year, month, and week from the latest news item
  const date = new Date(latestNewsItem.date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();
  const week = Math.ceil(dayOfMonth / 7);

  redirect(`/${chain.toLowerCase()}/news/${year}/${month}/${week}`);
}
