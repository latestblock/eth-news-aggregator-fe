import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { Chain } from "@/app/types";
import { getDefaultChain } from "@/app/utils/chainUtils";
import { chainOptions } from "@/app/components/chain-icons";

export default async function ChainHomePage({
  params,
}: {
  params: { chain?: string };
}) {
  // Default to Ethereum if chain is not provided or invalid
  const chainParam = params.chain?.toUpperCase() || "";

  // Validate that the chain is a valid enum value
  const chain = Object.values(Chain).includes(chainParam as Chain)
    ? (chainParam as Chain)
    : getDefaultChain();

  // Check if the chain is disabled
  const chainOption = chainOptions.find((option) => option.id === chain);
  if (chainOption?.disabled) {
    // Redirect to Ethereum if the chain is disabled
    redirect(`/${getDefaultChain()}`);
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
          Latest {chain} News
        </h1>
        <p>No news found for {chain}</p>
      </div>
    );
  }

  // Calculate year, month, and week from the latest news item
  const date = new Date(latestNewsItem.date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const dayOfMonth = date.getDate();
  const week = Math.ceil(dayOfMonth / 7);

  redirect(`/${chain}/news/${year}/${month}/${week}`);
}
