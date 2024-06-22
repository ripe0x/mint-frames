import React, { useRef } from "react";

type Props = {
  url: string;
};

const CopyLink = (props: Props) => {
  const linkRef = useRef<HTMLInputElement>(null);

  const copyToClipboard = () => {
    const linkField = linkRef.current;

    if (linkField) {
      // Select the text field
      linkField.select();
      linkField.setSelectionRange(0, 99999); // For mobile devices

      // Copy the text inside the text field
      navigator.clipboard
        .writeText(linkField.value)
        .then(() => {
          // alert("Link copied to clipboard!");
        })
        .catch((error) => {
          console.error("Failed to copy text: ", error);
        });
    }
  };

  return (
    <div className="container flex gap-4 flex-col w-full">
      <input
        type="text"
        ref={linkRef}
        value={props.url}
        readOnly
        className="w-full p-2 rounded-full bg-slate-800 text-gray-400 text-ellipsis text-xs px-4"
      />
      <button
        onClick={copyToClipboard}
        className="text-white focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700"
      >
        Copy Frame Link
      </button>
    </div>
  );
};

export default CopyLink;
