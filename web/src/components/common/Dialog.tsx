import React from "react";
import { css, SerializedStyles } from "@emotion/react";

import { dialogStyles } from "@/styles/dialog";

interface Props {
  size: "small" | "large";
  children: React.ReactNode;
  cssOverlap?: SerializedStyles;
}

const Dialog = ({
  size,
  children,
  cssOverlap = css``,
}: Props) => {
  const buttonStyle = getButtonStyle(size);

  return (
    <div
      css={css`
        border: 1px solid #000;

        ${size === "small"
          ? dialogStyles.small
          : dialogStyles.large}
        ${buttonStyle}
        ${cssOverlap}
      `}
    >
      {children}
    </div>
  );
};

Dialog.ContentsContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="dialog-contents-container">
      {children}
    </div>
  );
};

Dialog.ButtonContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className="dialog-button-container"
      css={css`
        display: flex;
        justify-content: center;
        gap: 10px;
      `}
    >
      {children}
    </div>
  );
};

Dialog.Button = ({
  onClick,
  children,
  cssOverlap = css``,
}: {
  onClick: () => void;
  children: React.ReactNode;
  cssOverlap?: SerializedStyles;
}) => {
  return (
    <div
      className="dialog-button"
      css={css`
        padding: 0.5em 1em 0.5em 1em;
        background-color: black;
        color: white;

        ${cssOverlap}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const getButtonStyle = (size: "small" | "large") => {
  switch (size) {
    case "small":
      return dialogStyles.small;
    case "large":
      return dialogStyles.large;
  }
};

export default Dialog;
