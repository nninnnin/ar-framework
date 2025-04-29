"use client";

import React from "react";
import { css } from "@emotion/react";

const GlobalNavigation = () => {
  return (
    <a href="/">
      <h1
        className="lora-bold"
        css={css`
          border-bottom: 1px solid black;
          padding: 20px;
          font-size: 24px;

          background-color: #fff;
          color: black;

          user-select: none;
        `}
      >
        AR Framework
      </h1>
    </a>
  );
};

export default GlobalNavigation;
