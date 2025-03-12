"use client";

import React from "react";
import { css } from "@emotion/react";

const NotFoundPage = () => {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        background-color: #fff;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        gap: 10px;

        padding-bottom: 2em;
      `}
    >
      <img width="80" src="/404face.png" />

      <div>페이지가 존재하지 않습니다.</div>
      <div>Page does not exist.</div>

      <a href="/">
        <button
          css={css`
            padding: 4px;
            margin-top: 12px;
          `}
        >
          Back to Home
        </button>
      </a>
    </div>
  );
};

export default NotFoundPage;
