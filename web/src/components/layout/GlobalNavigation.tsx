"use client";

import React from "react";
import { css } from "@emotion/react";
import { Jacquard_24 } from "next/font/google";

const jacquard = Jacquard_24({
  weight: ["400"],
  style: "normal",
  subsets: ["latin"],
});

const GlobalNavigation = () => {
  return (
    <h1
      className={jacquard.className}
      css={css`
        border-bottom: 1px solid black;
        padding: 16px;
        font-size: 32px;

        background-color: #fff;
        color: black;

        user-select: none;
      `}
    >
      AR framework
    </h1>
  );
};

export default GlobalNavigation;
