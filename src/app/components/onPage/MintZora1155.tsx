"use client";
import { zoraERC1155Abi } from "@/abi/zoraERC1155Abi";
import { useGetZora1155MintCosts } from "@/app/hooks/useGetZora1155MintCosts";
import { useGetZora1155MintParameters } from "@/app/hooks/useGetZora1155MintParameters";
import React, { useState } from "react";
import { formatEther } from "viem";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useWriteContract,
  useSimulateContract,
  useWaitForTransactionReceipt,
  useAccount,
  useSwitchChain,
} from "wagmi";
import { chainIdFromChainLabel } from "@/lib/chainIdFromChainLabel";

type Props = {
  contractAddress: `0x${string}`;
  tokenId: number;
  chain: string;
  mintQuantity: number;
};

const MintZora1155 = (props: Props) => {
  const [mintQuantity, setMintQuantity] = useState(1);
  const account = useAccount();
  const mintCosts = useGetZora1155MintCosts(
    props.contractAddress,
    props.tokenId,
    props.mintQuantity,
    props.chain
  );
  const parameters = useGetZora1155MintParameters(
    props.contractAddress,
    props.tokenId,
    props.mintQuantity,
    props.chain
  );

  const { data, error, isLoading } = useSimulateContract({
    address: props.contractAddress,
    abi: zoraERC1155Abi,
    functionName: "mintWithRewards",
    args: parameters?.data?.args,
    value: mintCosts.data?.totalCostEth,
    chainId: chainIdFromChainLabel(props.chain),
  });

  const {
    data: hash,
    isPending,
    writeContract,
    error: writeError,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const { switchChain } = useSwitchChain();

  return (
    <div>
      <div>
        <div className="relative flex items-center max-w-[8rem] my-4 mx-auto xl:mx-0">
          <button
            type="button"
            id="decrement-button"
            data-input-counter-decrement="quantity-input"
            className="bg-black hover:bg-gray-600 border-gray-600 border rounded-s-lg p-3 h-11 focus:ring-gray-700 focus:ring-2 focus:outline-none"
            onClick={() => {
              if (mintQuantity > 1) {
                setMintQuantity(mintQuantity - 1);
              }
            }}
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <input
            type="text"
            id="quantity-input"
            data-input-counter
            aria-describedby="helper-text-explanation"
            className="bg-black hover:bg-gray-600  border text-sm block w-full py-2.5  border-gray-600 placeholder-gray-400 ext-white focus:ring-blue-500 focus:border-blue-500 h-11 text-center"
            value={mintQuantity}
            onChange={(e) => console.log("mintQuantity", mintQuantity)}
            required
          />
          <button
            type="button"
            id="increment-button"
            data-input-counter-increment="quantity-input"
            className="bg-black hover:bg-gray-600 border-gray-600 border rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            onClick={() => setMintQuantity(mintQuantity + 1)}
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>

        <p className="text-[12px] opacity-60 mt-1 italic"></p>

        {account.address ? (
          <>
            {account.chainId === chainIdFromChainLabel(props.chain) ? (
              <button
                disabled={!Boolean(data?.request)}
                onClick={() => writeContract(data!.request)}
                className="uppercase tracking-widest text-[14px] font-bold border border-slate-600 hover:border-slate-200 p-2 px-3 rounded-md my-2 disabled:opacity-15"
              >
                {isPending && "Confirming..."}
                {isLoading && "Loading..."}
                {isConfirming && "Waiting for confirmation..."}
                {!isPending &&
                  !isLoading &&
                  !isConfirming &&
                  `Mint ${mintQuantity} `}
              </button>
            ) : (
              <button
                disabled={!Boolean(data?.request)}
                onClick={() =>
                  switchChain({ chainId: chainIdFromChainLabel(props.chain) })
                }
                className="uppercase tracking-widest text-[14px] font-bold border border-slate-600 hover:border-slate-200 p-2 px-3 rounded-md my-2 disabled:opacity-15"
              >
                Change network
              </button>
            )}

            {isConfirmed && hash && (
              <p className="text-xs mb-4">
                <a
                  href={`https://basescan.org/tx/${hash}`}
                  className="opacity-75 underline hover:no-underline hover:opacity-100"
                >
                  Transaction confirmed
                </a>
              </p>
            )}
          </>
        ) : (
          <>
            <div className="my-2 mx-auto lg:mx-0 flex justify-center xl:justify-start">
              <ConnectButton
                showBalance={false}
                label="Connect wallet to mint"
              />
            </div>
          </>
        )}
        <p className="text-sm my-4">
          Total cost:{" "}
          {mintCosts.data?.totalCostEth &&
            formatEther(mintCosts.data?.totalCostEth)}{" "}
          ETH
        </p>
        <p className="text-[12px] opacity-60 mt-1 italic ">
          <a
            href="https://support.zora.co/en/articles/1368641"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline hover:opacity-100"
          >
            includes Zora protocol fee
          </a>{" "}
          of{" "}
          {mintCosts.data?.mintFee &&
            formatEther(BigInt(mintCosts.data?.mintFee))}{" "}
          ETH {mintQuantity > 1 && `(0.000777 ETH per token)`}
        </p>
      </div>
    </div>
  );
};

export default MintZora1155;
