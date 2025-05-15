import React from "react";
import { css } from "@emotion/react";
import { useOverlay } from "@toss/use-overlay";

import Overlay from "@/shared/components/Overlay";
import { OverlayCloseContext } from "@/features/project/components/ProjectSection";
import { useSelectedGroup } from "@/features/group/hooks/useSelectedGroup";

import dynamic from "next/dynamic";

const ProjectDetailsDialog = dynamic(
  () =>
    import(
      "@/features/project/components/ProjectDetailsDialog"
    ),
  {
    ssr: false,
  }
);

const ConnectButton = ({
  projectItemUid,
}: {
  projectItemUid: string;
}) => {
  const overlay = useOverlay();
  const { selectedGroup } = useSelectedGroup();

  const onClick = (projectUid: string) => {
    overlay.open(({ close, isOpen }) => {
      return (
        <Overlay isOpen={isOpen}>
          <OverlayCloseContext.Provider
            value={{ close }}
          >
            <ProjectDetailsDialog
              projectUid={projectUid}
              groupName={selectedGroup?.name ?? ""}
            />
          </OverlayCloseContext.Provider>
        </Overlay>
      );
    });
  };

  return (
    <div
      css={css`
        padding: 0.7em;
        background-color: white;
        flex: 1;
        color: black;
        font-size: 0.8em;
        cursor: pointer;

        &:hover {
          background-color: #f1f1f1;
        }
      `}
      onClick={() => onClick(projectItemUid)}
    >
      접속
    </div>
  );
};

export default ConnectButton;
