import { redirect } from "next/navigation";
import { Chain } from "@/app/types";
import { getDefaultChain } from "./utils/chainUtils";

export default async function Home() {
  const defaultChain = getDefaultChain();
  redirect(`/${defaultChain}`);
}
