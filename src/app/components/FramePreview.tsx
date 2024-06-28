"use client";
import React, { useEffect } from "react";
import { useFrame } from "@frames.js/render/use-frame";
import {
  FrameUI,
  fallbackFrameContext,
  signFrameAction,
  FarcasterSigner,
} from "@frames.js/render";
import { parseZoraUrl } from "@/lib/parseZoraUrl";

type Props = {
  frameUrl: string;
  setFrameStateRequestStatus: (
    status:
      | "message"
      | "pending"
      | "done"
      | "doneRedirect"
      | "requestError"
      | undefined
  ) => void;
};

const isValidUrl = (url: string) => {
  const { contractAddress, tokenId } = parseZoraUrl(url);
  if (contractAddress && tokenId) {
    return true;
  }
  return false;
};

const FramePreview = (props: Props) => {
  const farcasterSigner: FarcasterSigner = {
    fid: 1,
    status: "approved",
    publicKey:
      "0x00000000000000000000000000000000000000000000000000000000000000000",
    privateKey:
      "0x00000000000000000000000000000000000000000000000000000000000000000",
  };

  const frameState = useFrame({
    homeframeUrl: props.frameUrl,
    frameActionProxy: "/frames",
    connectedAddress: undefined,
    frameGetProxy: "/frames",
    frameContext: fallbackFrameContext,

    signerState: {
      hasSigner: farcasterSigner !== undefined,
      signer: farcasterSigner,
      onSignerlessFramePress: () => {
        // Only run if `hasSigner` is set to `false`
        // This is a good place to throw an error or prompt the user to login
        alert("Transaction signing is disabled in preview mode.");
      },
      signFrameAction: signFrameAction,
    },
  });
  useEffect(() => {
    if (frameState.currentFrameStackItem?.status) {
      props.setFrameStateRequestStatus(frameState.currentFrameStackItem.status);
    }
  }, [frameState]);

  return (
    <div className="w-[400px] text-center">
      {!isValidUrl(props.frameUrl) && (
        <div>
          <p className="text-sm text-gray-400">
            Invalid URL. Please paste a valid Zora mint URL.
          </p>
        </div>
      )}
      {/* <FrameUI frameState={frameState as any} theme={{}} /> */}
      {isValidUrl(props.frameUrl) &&
        frameState.currentFrameStackItem?.status === "pending" && (
          <div>
            <p className="text-sm text-gray-400">Loading frame preview...</p>
          </div>
        )}
      {isValidUrl(props.frameUrl) &&
        frameState.currentFrameStackItem?.status === "requestError" && (
          <div>
            Error:{" "}
            <strong>
              {frameState.currentFrameStackItem.requestError.name}
            </strong>
            {frameState.currentFrameStackItem.requestError.message}
          </div>
        )}
      {isValidUrl(props.frameUrl) &&
        frameState.currentFrameStackItem?.status === "done" && (
          <div>
            <FrameUI frameState={frameState} theme={{}} />
          </div>
        )}
    </div>
  );
};

export default FramePreview;
