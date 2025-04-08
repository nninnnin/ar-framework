import React from "react";
import { css } from "@emotion/react";

const Option = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <li
      css={css`
        list-style: none;
        font-size: 12px;

        padding: 4px 6px;
        border-radius: 2px;

        cursor: pointer;

        &:hover {
          background-color: #f0f0f0;
        }
      `}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

export default Option;
