import React from "react";
import { css } from "@emotion/react";

const ContextMenu = () => {};

ContextMenu.Container = ({
  children,
  position,
}: {
  children: React.ReactNode;
  position: { x: number; y: number };
}) => {
  return (
    <div
      id="context-container"
      css={css`
        position: fixed;
        top: ${position.y}px;
        left: ${position.x}px;
        transform: translate(-100%, -100%);
        z-index: 9999;

        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        padding: 8px;
      `}
    >
      {children}
    </div>
  );
};

export default ContextMenu;
