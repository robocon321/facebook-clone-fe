import { SubMentionComponentProps } from "@draft-js-plugins/mention/lib/Mention";
import React from "react";

const MarketplacePage = (mentionProps: SubMentionComponentProps) => {
  return (
    <span
      className={mentionProps.className}
      // eslint-disable-next-line no-alert
      onClick={() => alert("Clicked on the Mention!")}
    >
      {mentionProps.children}
    </span>
  );
};

export default MarketplacePage;
