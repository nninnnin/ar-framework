import { css } from "@emotion/react";
import React from "react";

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
}

const Overlay = ({ isOpen, children }: Props) => {
  return (
    <>
      {isOpen && (
        <div
          css={css`
            width: 100vw;
            height: 100dvh;
            background-color: rgba(0, 0, 0, 0.5);

            position: fixed;
            top: 0;
            left: 0;
            z-index: 100;

            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Overlay;
