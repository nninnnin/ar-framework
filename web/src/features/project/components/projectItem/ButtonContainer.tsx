import React from "react";
import { css } from "@emotion/react";

const ButtonContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className="project-item-button-container"
      css={css`
        position: absolute;
        bottom: 0;
        right: 0;

        width: 100%;

        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1px;

        background-color: #000000;

        border-top: 1px solid #000000;

        visibility: hidden;
        pointer-events: none;
      `}
    >
      {children}
    </div>
  );
};

export default ButtonContainer;
