import React from "react";
import { css } from "@emotion/react";

const FunnelButtonContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      css={css`
        width: 100%;
        display: flex;

        border-top: 1px solid #000;

        background-color: black;
        gap: 1px;
      `}
    >
      {children}
    </div>
  );
};

export default FunnelButtonContainer;
