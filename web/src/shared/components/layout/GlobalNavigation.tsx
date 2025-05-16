"use client";

import React from "react";
import { css } from "@emotion/react";

const GlobalNavigation = () => {
  return (
    <h1
      css={css`
        border-bottom: 1px solid black;
        padding: 20px;

        background-color: #fff;
        color: black;

        user-select: none;
      `}
    >
      <a
        className="lora-bold"
        css={css`
          font-size: 24px;
        `}
        href="/"
      >
        AR Framework
      </a>
    </h1>
  );
};

export default GlobalNavigation;
