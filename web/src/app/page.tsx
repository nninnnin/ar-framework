"use client";

import { css } from "@emotion/react";
import { useOverlay } from "@toss/use-overlay";

import GroupItem from "@/components/home/GroupItem";
import Overlay from "@/components/common/Overlay";
import GroupCreationDialog from "@/components/home/GroupCreationDialog";

export default function Home() {
  const overlay = useOverlay();

  const handleCreateGroupClick = () => {
    overlay.open(({ isOpen, close }) => {
      return (
        <Overlay isOpen={isOpen}>
          <GroupCreationDialog close={close} />
        </Overlay>
      );
    });
  };

  return (
    <div
      css={css`
        background-color: #fff;
        height: 100%;
        display: flex;
      `}
    >
      <div
        css={css`
          background-color: violet;
          padding: 1em;
        `}
      >
        <GroupItem onClick={handleCreateGroupClick}>그룹 만들기</GroupItem>
      </div>

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
