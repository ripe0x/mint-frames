"use client";
import React, { useEffect, useState } from "react";
import FramePreview from "./FramePreview";
import CopyLink from "./CopyLink";
import { parseZoraUrl } from "@/lib/parseZoraUrl";

type Props = {
  baseUrl: string | null;
};

const isValidUrl = (url: string) => {
  const { contractAddress, tokenId } = parseZoraUrl(url);

  if (contractAddress && tokenId) {
    return true;
  }
  return false;
};

const UrlInput = (props: Props) => {
  const [isMounted, setIsMounted] = React.useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  // if props.baseUrl contains localhost, set var baseUrlPrefix to 'http://' else set to 'https://'
  const baseUrlPrefix = props.baseUrl?.includes("localhost")
    ? "http://"
    : "https://";

  const [frameStateRequestStatus, setFrameStateRequestStatus] = useState<
    "message" | "pending" | "done" | "doneRedirect" | "requestError" | undefined
  >();
  const [chain, setChain] = React.useState("");
  const [contractAddress, setContractAddress] = React.useState("");
  const [tokenId, setTokenId] = React.useState("");
  const [url, setUrl] = React.useState("");
  const handleUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setUrl("");
      setContractAddress("");
      setTokenId("");
      return;
    }
    const url = e.target.value;
    // const chainLabel = url.split("/")[4];
    const urlParts = url.split("/");
    const chain = urlParts[4]?.split(":")[0] || "";
    const contractAddress = urlParts[4]?.split(":")[1] || "";
    const tokenId = urlParts[5] || "";
    if (!contractAddress || !tokenId) {
      setUrl("");
      setContractAddress("");
      setTokenId("");
      setChain("");
      return;
    }
    setContractAddress(contractAddress);
    setTokenId(tokenId);
    setUrl(url);
    setChain(chain);
  };

  return (
    <div>
      {isMounted && (
        <>
          <form className="max-w-2xl mx-auto">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Zora mint url
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Zora mint url"
                required
                onKeyDown={(e) => {
                  e.key === "Enter" && e.preventDefault();
                }}
                onChange={(e) => {
                  handleUrl(e);
                }}
              />
            </div>
          </form>
          <div className="flex justify-center mt-20">
            {isMounted && props.baseUrl && url !== "" && (
              <>
                {isValidUrl(url) ? (
                  <>
                    <FramePreview
                      frameUrl={`${baseUrlPrefix}${props.baseUrl}/f/${chain}/${contractAddress}/${tokenId}`}
                      setFrameStateRequestStatus={setFrameStateRequestStatus}
                    />
                  </>
                ) : (
                  <div>Invalid URL. Please paste a valid Zora mint URL.</div>
                )}
              </>
            )}
          </div>
          <div className="flex justify-center mt-6 text-center">
            {props.baseUrl &&
              url !== "" &&
              isValidUrl(url) &&
              frameStateRequestStatus === "done" && (
                <div className="w-full max-w-[400px]">
                  <CopyLink
                    url={`${baseUrlPrefix}${props.baseUrl}/${chain}/${contractAddress}/${tokenId}`}
                  />
                </div>
              )}
          </div>
        </>
      )}
    </div>
  );
};

export default UrlInput;
