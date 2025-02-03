import React from "react";
import { css } from "@emotion/react";

interface Props {
  children: React.ReactNode;
  onCancelClick: () => void;
  onConfirmClick: () => void;
}

const Dialog = ({ children, onConfirmClick, onCancelClick }: Props) => {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1.2em;

        background-color: #fff;

        padding: 1em;
      `}
    >
      <div>{children}</div>

      <div
        css={css`
          display: flex;
          justify-content: center;
          gap: 10px;
        `}
      >
        <Dialog.Button onClick={onCancelClick}>닫기</Dialog.Button>
        <Dialog.Button onClick={onConfirmClick}>만들기</Dialog.Button>
      </div>
    </div>
  );
};

Dialog.Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div
      css={css`
        padding: 0.5em 1em 0.5em 1em;
        background-color: black;
        color: white;
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Dialog;
