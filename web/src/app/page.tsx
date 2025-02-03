"use client";

import { css } from "@emotion/react";

import GroupSection from "@/components/home/GroupSection";

export default function Home() {
  return (
    <div
      css={css`
        background-color: #fff;
        height: 100%;
        display: flex;
      `}
    >
      <GroupSection />

      <div
        css={css`
          background-color: aliceblue;
          flex: 1;
        `}
      >
        프로젝트 섹션
      </div>
    </div>
  );
}
