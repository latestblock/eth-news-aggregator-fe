import { redirect } from "next/navigation";
import { Chain } from "@/app/types";
import { getDefaultChain } from "@/app/utils/chainUtils";

export default async function LegacyNewsPage({
  params,
}: {
  params: { year: string; month: string; week: string };
}) {
  const year = params.year;
  const month = params.month;
  const week = params.week;
  const defaultChain = getDefaultChain();

  // Redirect to the new URL structure with the chain parameter
  redirect(`/${defaultChain}/news/${year}/${month}/${week}`);
}
