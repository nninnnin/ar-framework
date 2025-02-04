import React from "react";
import { css } from "@emotion/react";

const GroupItem = ({
  children,
  onClick,
  type = "item",
}: {
  children: React.ReactNode;
  onClick: () => void;
  type?: "item" | "creation";
}) => {
  return (
    <div
      css={css`
        background-color: ${type === "item" ? "white" : "black"};
        color: ${type === "item" ? "black" : "white"};
        padding: 1em;

        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GroupItem;
