import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React from "react";

const GlobalHeader = () => {
  return (
    <div className="flex flex-row gap-4 justify-between items-center p-2 m-2 border-b pb-4 border-b-gray-600">
      <div>
        <h1 className="text-xs uppercase font-bold tracking-wide">
          <Link href={"/"}>drops.wtf</Link>
        </h1>
      </div>
      <ConnectButton showBalance={false} />
    </div>
  );
};
export default GlobalHeader;
