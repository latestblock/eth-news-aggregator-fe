import { redirect } from "next/navigation";
import { getDefaultChainRoute } from "./utils/chainUtils";
import { Metadata } from "next";
import { generateMetadata } from "./utils/generate-metadata";

export const metadata: Metadata = generateMetadata({
  title: "Home",
  description:
    "Stay updated with the latest Ethereum news aggregated from trusted sources across the web.",
});

export default async function Home() {
  const defaultChain = getDefaultChainRoute();
  redirect(`/${defaultChain}`);
}

// todo: remove console logs
// todo: add more error boundries
// todo: fix the loading to be smoother
