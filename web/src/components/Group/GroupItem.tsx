import React from "react";
import { css, SerializedStyles } from "@emotion/react";

const GroupItem = ({
  children,
  onClick,
  cssOverlap,
}: {
  children: React.ReactNode;
  onClick: () => void;
  cssOverlap?: SerializedStyles;
}) => {
  return (
    <div
      css={css`
        background-color: white;
        padding: 1em;

        border: 1px solid black;

        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;

        ${cssOverlap}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GroupItem;
