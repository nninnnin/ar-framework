import React from "react";
import { css } from "@emotion/react";

const ProjectItemContainer = ({
  children,
  onClick = () => {},
  type = "item",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "item" | "creation";
}) => {
  return (
    <div
      css={css`
        position: relative;

        background-color: white;
        color: black;
        font-weight: 400;
        border: 1px solid black;

        &:hover > .project-item-button-container {
          visibility: visible;
          pointer-events: auto;
        }

        width: 170px;
        height: 170px;

        list-style: none;

        display: flex;
        justify-content: center;
        align-items: center;

        word-break: keep-all;
        text-align: center;

        user-select: none;

        ${type === "creation" &&
        css`
          cursor: pointer;

          &:hover {
            background-color: #f1f1f1;
          }
        `};
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default ProjectItemContainer;
