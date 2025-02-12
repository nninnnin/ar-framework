import React from "react";
import { css } from "@emotion/react";

const ProjectItem = ({
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
        position: relative;

        background-color: white;
        font-weight: 400;
        border: 1px solid black;

        &:hover {
          background-color: #f0f0f0;
        }

        width: 170px;
        height: 170px;

        list-style: none;

        display: flex;
        justify-content: center;
        align-items: center;

        word-break: keep-all;
        text-align: center;

        cursor: pointer;
        user-select: none;
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ProjectItem;
