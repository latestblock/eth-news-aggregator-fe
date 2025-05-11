import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { Chain } from "@/app/types";
import OgImageResponse from "@/app/components/og-image-response";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const chainParam =
      searchParams.get("chain")?.toUpperCase() || Chain.ETHEREUM;
    const chain = Object.values(Chain).includes(chainParam as Chain)
      ? (chainParam as Chain)
      : Chain.ETHEREUM;

    const title =
      searchParams.get("title") ||
      `${chain.charAt(0) + chain.slice(1).toLowerCase()} News`;
    const description =
      searchParams.get("description") ||
      "Stay updated with the latest blockchain news";

    return new ImageResponse(
      <OgImageResponse title={title} description={description} chain={chain} />,
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(`Error generating OG image: ${e.message}`);
    return new Response(`Failed to generate OG image: ${e.message}`, {
      status: 500,
    });
  }
}
