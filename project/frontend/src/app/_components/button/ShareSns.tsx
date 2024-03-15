"use client";

import { LineIcon, LineShareButton } from "react-share";

export const ShareSnsButton = ({ url }: { url: string }) => {
  return (
    <LineShareButton url={url}>
      <LineIcon size={24} />
    </LineShareButton>
  );
};
