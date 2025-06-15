import React from "react";
import { css } from "@emotion/react";
import { useOverlay } from "@toss/use-overlay";

import Overlay from "@/shared/components/Overlay";
import { OverlayCloseContext } from "@/features/project/components/ProjectSection";
import { useSelectedGroup } from "@/features/group/hooks/useSelectedGroup";

import dynamic from "next/dynamic";
import useProjectUidContext from "@/features/project/hooks/useProjectUidContext";

const ProjectDetailsDialog = dynamic(
  () =>
    import(
      "@/features/project/components/ProjectDetailsDialog"
    ),
  {
    ssr: false,
  }
);

const ConnectButton = () => {
  const { projectItem } = useProjectUidContext();

  const overlay = useOverlay();
  const { selectedGroup } = useSelectedGroup();

  const onClick = ({
    projectId,
    templateId,
  }: {
    projectId: string;
    templateId: string;
  }) => {
    overlay.open(({ close, isOpen }) => {
      return (
        <Overlay isOpen={isOpen}>
          <OverlayCloseContext.Provider
            value={{ close }}
          >
            <ProjectDetailsDialog
              projectId={projectId}
              templateId={templateId}
              groupName={selectedGroup?.name ?? ""}
            />
          </OverlayCloseContext.Provider>
        </Overlay>
      );
    });
  };

  if (!projectItem) return;

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
      onClick={() =>
        onClick({
          projectId: projectItem.uid,
          templateId: projectItem.templateId,
        })
      }
    >
      접속
    </div>
  );
};

export default ConnectButton;
