import { redirect } from "next/navigation";
import { Chain } from "@/app/types";
import { getDefaultChainRoute } from "./utils/chainUtils";
import { Metadata } from "next";
import { generateMetadata } from "./utils/generate-metadata";
import { siteConfig } from "./config/seo-config";

export const metadata: Metadata = {
  ...generateMetadata({
    title: "Home",
    description:
      "Stay updated with the latest Ethereum news aggregated from trusted sources across the web.",
  }),
  title: `Home | ${siteConfig.name}`,
};

export default async function Home() {
  const defaultChain = getDefaultChainRoute();
  redirect(`/${defaultChain}`);
}
