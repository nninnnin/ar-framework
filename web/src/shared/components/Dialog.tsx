import React from "react";
import { css, SerializedStyles } from "@emotion/react";

import { dialogStyles } from "@/shared/styles/dialog";

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

Dialog.HeaderLabel = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      css={css`
        padding-left: 10px;
        font-size: 0.8em;
      `}
    >
      {children}
    </div>
  );
};

Dialog.Header = ({
  handleCloseClick,
  children,
  disableCloseButton = false,
}: {
  handleCloseClick: () => void;
  children?: React.ReactNode;
  disableCloseButton?: boolean;
}) => {
  return (
    <div className="dialog-header">
      <div>{children}</div>

      <svg
        className="dialog-close-button"
        css={css`
          ${disableCloseButton
            ? css`
                pointer-events: none;
              `
            : ""}
        `}
        viewBox="0 0 40 40"
        preserveAspectRatio="none"
        width="100%"
        height="100%"
        onClick={handleCloseClick}
      >
        <rect
          width="100%"
          height="100%"
          fill={
            disableCloseButton ? "gainsboro" : "black"
          }
        />

        <path
          fill="none"
          stroke="white"
          strokeWidth="2"
          d="M10,10 L30,30 M30,10 L10,30"
        />
      </svg>
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
  disabled = false,
}: {
  onClick: () => void;
  children: React.ReactNode;
  cssOverlap?: SerializedStyles;
  disabled?: boolean;
}) => {
  return (
    <div
      className="dialog-button"
      css={css`
        background-color: #fff;

        cursor: pointer;
        user-select: none;

        ${cssOverlap}

        ${disabled &&
        css`
          cursor: not-allowed !important;
          pointer-events: none !important;
          background-color: #f0f0f0 !important;
          color: #bebebe !important;
          border-color: #bebebe !important;
        `}
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
