"use client";

import { css } from "@emotion/react";

import GroupSection from "@/features/group/components/GroupSection";
import dynamic from "next/dynamic";

const ProjectSection = dynamic(
  () =>
    import(
      "@/features/project/components/ProjectSection"
    ),
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
