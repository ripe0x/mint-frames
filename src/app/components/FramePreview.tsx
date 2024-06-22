"use client";
import React, { useEffect } from "react";
import { getFrame, Frame, getFrameFlattened } from "frames.js";
import { useFrame } from "@frames.js/render/use-frame";
import {
  FrameUI,
  fallbackFrameContext,
  FrameContext,
  signFrameAction,
  FarcasterSigner,
} from "@frames.js/render";
import {
  mockFarcasterSigner,
  createFrameActionMessageWithSignerKey,
} from "@frames.js/render/farcaster";
import { FrameImageNext } from "@frames.js/render/next";
import type { Metadata } from "next";
import { Button } from "frames.js/next";

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

const FramePreview = (props: Props) => {
  console.log("props", props);
  const [frame, setFrame] = React.useState<Frame | null>(null);
  const farcasterSigner: FarcasterSigner = {
    fid: 1,
    status: "approved",
    publicKey:
      "0x00000000000000000000000000000000000000000000000000000000000000000",
    privateKey:
      "0x00000000000000000000000000000000000000000000000000000000000000000",
  };

  const frameState = useFrame({
    // replace with your frame url
    homeframeUrl:
      // "https://fc-polls.vercel.app/polls/73c6efda-bae7-4d46-8f36-3bb3b8377448",
      // props.frameUrl,
      props.frameUrl,
    // corresponds to the name of the route for POST in step 3
    // frameActionProxy: "/f",
    frameActionProxy: "/frames",
    connectedAddress: undefined,
    // corresponds to the name of the route for GET in step 3
    frameGetProxy: "/frames",
    // frameGetProxy: "/f/0xee69c2ac12a2e0aaceaaa8914bd3e8ab52d90c14/8",
    frameContext: fallbackFrameContext,
    // map to your identity if you have one
    signerState: {
      hasSigner: farcasterSigner !== undefined,
      signer: farcasterSigner,
      onSignerlessFramePress: () => {
        // Only run if `hasSigner` is set to `false`
        // This is a good place to throw an error or prompt the user to login
        alert(
          "A frame button was pressed without a signer. Perhaps you want to prompt a login"
        );
      },
      signFrameAction: signFrameAction,
    },
  });
  console.log("frameState", frameState, frameState.currentFrameStackItem);
  useEffect(() => {
    console.log("frameState", frameState);
    console.log("frameState.framesStack", frameState.framesStack);
    if (frameState.currentFrameStackItem?.status) {
      props.setFrameStateRequestStatus(frameState.currentFrameStackItem.status);
    }
  }, [frameState]);

  return (
    <div className="w-[400px] text-center">
      {frameState.currentFrameStackItem?.status === "pending" && (
        <div>Loading frame preview...</div>
      )}
      {frameState.currentFrameStackItem?.status === "requestError" && (
        <div>
          Error:{" "}
          <strong>{frameState.currentFrameStackItem.requestError.name}</strong>
          {frameState.currentFrameStackItem.requestError.message}
        </div>
      )}
      {frameState.currentFrameStackItem?.status === "done" && (
        <div>
          <FrameUI
            frameState={frameState}
            theme={{}}
            FrameImage={FrameImageNext}
            // allowPartialFrame={true}
          />
        </div>
      )}
    </div>
  );
};

export default FramePreview;
