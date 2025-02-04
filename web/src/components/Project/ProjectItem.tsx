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
        background-color: ${type === "item" ? "violet" : "black"};
        color: ${type === "item" ? "black" : "white"};

        width: 170px;
        height: 170px;

        list-style: none;

        display: flex;
        justify-content: center;
        align-items: center;

        word-break: keep-all;
        text-align: center;

        cursor: pointer;
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ProjectItem;
