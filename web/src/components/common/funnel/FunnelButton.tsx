import { css } from "@emotion/react";
import React from "react";

const FunnelButton = ({
  children,
  onClick,
  cssOverlap,
}: {
  children: React.ReactNode;
  onClick: () => void;
  cssOverlap?: TemplateStringsArray;
}) => {
  return (
    <div
      css={css`
        flex: 1;
        padding: 1em;

        text-align: center;
        background-color: #fff;

        cursor: pointer;

        ${cssOverlap}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default FunnelButton;
