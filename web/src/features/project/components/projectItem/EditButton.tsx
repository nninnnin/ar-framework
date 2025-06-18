import React from "react";
import { css } from "@emotion/react";
import { useOverlay } from "@toss/use-overlay";

import Overlay from "@/shared/components/Overlay";
import ProjectModelEditingDialog from "@/features/projectCreation/components/funnelSteps/ProjectModelEditingDialog";
import useProjectUidContext from "@/features/project/hooks/useProjectUidContext";

const EditButton = () => {
  const { projectItem } = useProjectUidContext();

  const overlay = useOverlay();

  const onClick = (projectId: string) => () => {
    overlay.open(({ close, isOpen }) => (
      <Overlay isOpen={isOpen}>
        <ProjectModelEditingDialog
          projectId={projectId}
          onClose={() => close()}
        />
      </Overlay>
    ));
  };

  if (!projectItem) return <></>;

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
      onClick={onClick(projectItem.uid)}
    >
      수정
    </div>
  );
};

export default EditButton;
