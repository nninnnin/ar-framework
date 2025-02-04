"use client";

import { css } from "@emotion/react";

import GroupSection from "@/components/home/GroupSection";
import ProjectSection from "@/components/home/ProjectSection";

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
      <ProjectSection />
    </div>
  );
}
