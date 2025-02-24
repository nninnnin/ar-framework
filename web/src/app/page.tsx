"use client";

import { css } from "@emotion/react";

import GroupSection from "@/components/Group/GroupSection";
import dynamic from "next/dynamic";

const ProjectSection = dynamic(
  () => import("@/components/Project/ProjectSection"),
  {
    ssr: false,
  }
);

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
