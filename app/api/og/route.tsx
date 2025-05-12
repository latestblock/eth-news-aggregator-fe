import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import { Chain } from "@/app/types";

export const runtime = "edge";

// Hardcoded these SVG data for each chain to avoid file system access in edge runtime
const CHAIN_LOGOS = {
  [Chain.ETHEREUM]:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPjxjaXJjbGUgY3g9IjUxMiIgY3k9IjUxMiIgcj0iNTEyIiBmaWxsPSIjNjI3RUVBIi8+PHBhdGggZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBkPSJNNTEyIDIyNC40OTZsLTE5My4xOTkgMjg4LjIyMUw1MTIgNjY2LjkzMmwxOTMuMzQ3LTE1NC4yMTJ6bTAgNDAyLjk4OGwtMTk0LjQwNi0xMzYuOTVMNTEyIDc5OS41MDRsMTkzLjQwMS0xNzIuNzUyeiIvPjwvc3ZnPg==",
  [Chain.BITCOIN]:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPjxjaXJjbGUgY3g9IjUxMiIgY3k9IjUxMiIgcj0iNTEyIiBmaWxsPSIjRjc5MzFBIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTU0NS43IDQ2MS4xYzEwLjEtNjcuNC00MS4zLTEwMy42LTExMS42LTEyNy44bDIyLjgtOTEuNS01NS41LTEzLjgtMjIuMiA4OUMzNjMgMzEwLjYgMzQ2LjYgMzA1IDMzMC42IDI5OS41bDIyLjMtODkuMy01NS40LTEzLjgtMjIuOCA5MS41Yy0xMy4xLTMtMjYuMS02LTM4LjYtOS4xbC4xLS40TDE3OC44IDI2M2wtMTQuOCA1OS41czQxLjMgOS40IDQwLjQgMTApLjEuMyAyMy4yIDUuN2MuNi45IDEuMSAyLjQuNyA0LjJsLTIzLjEgOTIuOGMyLjMuNiAyLjggNC42IDIuMiA0LjMtLjYtLjMtNDIuOC0xMC43LTQyLjgtMTAuN2wtMjkuMiA2Ny40IDQwLjQgMTAuMSAyMi4zIDUuNi0yMi45IDkxLjkgNTUuNSAxMy44IDIyLjgtOTEuNWMxNi40IDQuNSAzMi40IDguNiA0OC4xIDEyLjVsLTIyLjYgOTEgNTUuNSAxMy44IDIyLjktOTEuOUMzOTcuNCA1MTcgNDcyIDUyMy44IDUwNy4yIDQ3NGMyOC4yLTM5LjktLjktNjMtMTkuNy03OC40IDM4LjUtNC42IDY3LjYtMjkuMiA1OC4yLTczLjR6TTQ1NSA1NTEuM2MtMjAgODAtMTU2LjcgMzYuOC0yMDAuOSAyNS45bDM1LjktMTQzLjZjNDQuMSAxMSAxODUuNSAzMi44IDE2NSAxMTcuN3ptMjAtMjA3LjljLTE4LjQgNzMuzEgM0OuNS0xMy45IDg5LjktMjIuNCBMNDgwLjYgMzYzLjJjMzguMyA5LjUgMTM4LjcgMjguMSAxMjEuMSA5OC4zeiIvPjwvc3ZnPg==",
  [Chain.SOLANA]:
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiPjxjaXJjbGUgY3g9IjUxMiIgY3k9IjUxMiIgcj0iNTEyIiBmaWxsPSIjOTk0NUZGIi8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTMzOCAxNjguOVoiLz48cGF0aCBmaWxsPSIjZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02OTMuOTEyIDQ2My42ODRjLTUuNTMyLTUuNTQ1LTEyLjkxNi04LjY1LTIwLjgwOS04LjY1SDE2My4wNDVjLTUuMzk3IDAtMTAuMTg4IDMuNDI1LTExLjk1MSA4LjUyNC0xLjc2IDUuMDk1LS4wODMgMTAuNzU1IDQuMTg1IDE0LjA3Mkw3MzEuOTIgNzgxLjUyMmM1LjQ5IDQuMTUgMTIuOTQzIDQuNjk1IDE4Ljk5OCAxLjM5OSA2LjA1Ni0zLjI5MyA5LjgyNi05LjY5NiA5LjgyNi0xNi42NDlWNDg0LjUxNGMwLTcuOTE3LTMuMTEtMTUuMzA0LTguNjYyLTIwLjgzTTcxMi44MyAyNDIuNzhjLTMuMzktNy4xNDYtMTAuNjIyLTExLjY5Ni0xOC41NTctMTEuNjk2aDExLjMxNGwtNTY2LjYxNiAzMDQuMDZjLTUuNCA0LjE1MS03LjAzNSAxMS4zNzgtNC4xODUgMTcuMzAyIDIuODU0IDUuOTI4IDguODk3IDkuNjYgMTUuNDc2IDkuNjZoMjYzLjc3Yy43NjQgMCAxLjUyNS0uMDM0IDIuMjg2LS4xMDVoNDY2Ljc3NmM3LjkzNCAwIDE1LjE2Ny00LjU0OCAxOC41NTctMTEuNjk0IDMuMzkxLTcuMTQ0IDIuMzcyLTE1LjU4LTIuNjE2LTIxLjY2bC0xODYuMjA1LTI4Ni41Njd6TTM0Ni44MTMgNjk4Ljg4Yy0yLjEwNSAyLjExNS00LjkzOSAzLjMxOS03Ljk1NCAzLjMxOWgtMTc1LjgxYy01LjM5NyAwLTEwLjE4OS0zLjQyNC0xMS45NTEtOC41MjMtMS43NjItNS4wOTgtLjA4NC0xMC43NTMgNC4xODItMTQuMDc0bDEzMC41NC05OS4xNTJjNS4wOTQtMy44NjkgMTEuNzM0LTQuNjQgMTcuNDgzLTEuOTkyIDUuNzQ4IDIuNjQ0IDkuNDEzIDguMzUyIDkuNDEzIDE0LjYzNXYxMDUuNzY1Yy4wMDEgMy4wMTgtMS4xOTggNS45MDEtMy4zMDQgOC4wMjEiLz48L3N2Zz4=",
};

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

    const chainImageSrc =
      CHAIN_LOGOS[chain as Chain] || CHAIN_LOGOS[Chain.ETHEREUM];

    // Add content type options needed by various social platforms
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0f1114",
            backgroundImage:
              "radial-gradient(circle at 25px 25px, #1f2229 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1f2229 2%, transparent 0%)",
            backgroundSize: "100px 100px",
            padding: "80px 40px",
            fontFamily: '"Inter", sans-serif',
          }}
        >
          {/* Content container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "20px",
              backgroundColor: "rgba(26, 29, 36, 0.95)",
              padding: "40px",
              maxWidth: "90%",
            }}
          >
            <img
              src={chainImageSrc}
              alt={`${chain} logo`}
              width="100"
              height="100"
              style={{ marginBottom: "20px" }}
            />

            <div
              style={{
                fontSize: "60px",
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                marginBottom: "20px",
                letterSpacing: "-0.025em",
                lineHeight: 1.2,
              }}
            >
              {title}
            </div>

            {/* Description */}
            <div
              style={{
                fontSize: "32px",
                color: "rgba(255, 255, 255, 0.7)",
                textAlign: "center",
                maxWidth: "800px",
                lineHeight: 1.4,
              }}
            >
              {description}
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "24px",
            }}
          >
            Latest Block
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        // Enable higher quality and optimize for all platforms
        debug: false,
        emoji: "twemoji",
        headers: {
          "Cache-Control":
            "public, max-age=86400, s-maxage=86400, stale-while-revalidate=31536000",
          "Content-Type": "image/png",
          "Content-Security-Policy":
            "default-src 'self'; img-src * data:; style-src 'unsafe-inline'",
        },
      }
    );
  } catch (e: any) {
    console.error(`Error generating OG image: ${e.message}`);
    return new Response(`Failed to generate OG image: ${e.message}`, {
      status: 500,
    });
  }
}
