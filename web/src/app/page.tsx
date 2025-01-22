"use client";

import { css } from "@emotion/react";

export default function Home() {
  const handleClick = async () => {
    // api로 요청을 보낸다.
    const res = await fetch("/api");
    const result = await res.json();

    console.log(result);
  };

  return (
    <div
      css={css`
        background-color: #fff;
        height: 100%;
      `}
    >
      <button
        css={css`
          margin-top: 1em;
          margin-left: 1em;
          padding: 0.3em;
        `}
        onClick={handleClick}
      >
        템플릿 생성하기
      </button>
    </div>
  );
}
