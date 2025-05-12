import React from "react";
import { Chain } from "@/app/types";

//todo: we can remove this component if the current implementation of the og images work.
interface Props {
  title: string;
  description: string;
  chain: Chain;
}

const OgImageResponse = ({ title, description, chain }: Props) => {
  const getChainImageSrc = () => {
    switch (chain) {
      case Chain.ETHEREUM:
        return "/images/chains/ethereum.svg";
      case Chain.SOLANA:
        return "/images/chains/solana.svg";
      case Chain.BITCOIN:
        return "/images/chains/bitcoin.svg";
      default:
        return "/images/chains/ethereum.svg";
    }
  };

  return (
    <>
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
            src={getChainImageSrc()}
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
          Latest BLock
        </div>
      </div>
    </>
  );
};

export default OgImageResponse;
