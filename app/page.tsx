import { redirect } from "next/navigation";
import { Chain } from "@/app/types";
import { getDefaultChainRoute } from "./utils/chainUtils";

export default async function Home() {
  const defaultChain = getDefaultChainRoute();
  redirect(`/${defaultChain}`);
}
