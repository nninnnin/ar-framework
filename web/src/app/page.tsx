"use client";

import { css } from "@emotion/react";

import GroupSection from "@/components/Group/GroupSection";
import ProjectSection from "@/components/Project/ProjectSection";

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
