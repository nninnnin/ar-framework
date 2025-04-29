"use client";

import { css } from "@emotion/react";

import { AnimatePresence, motion } from "motion/react";

import GroupSection from "@/features/group/components/GroupSection";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

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
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowIntro(false);
    }, 1000);
  }, []);

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

      <AnimatePresence>
        {showIntro && <Home.Intro />}
      </AnimatePresence>
    </div>
  );
}

Home.Intro = () => {
  return (
    <motion.div
      css={css`
        position: fixed;
        top: 0;
        left: 0;

        width: 100vw;
        height: 100dvh;
        background-color: #fff;

        font-size: 3vw;

        display: flex;
        justify-content: center;
        align-items: center;
      `}
      className="lora-bold"
      initial={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
    >
      AR Framework
    </motion.div>
  );
};
