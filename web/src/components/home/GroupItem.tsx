import React from "react";
import { css } from "@emotion/react";

const GroupItem = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      css={css`
        background-color: black;
        color: white;
        padding: 1em;
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GroupItem;
