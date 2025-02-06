"use client";

import { css } from "@emotion/react";
import React, { useContext } from "react";

import { ProjectType } from "@/types/project";
import { useSelectedProjectType } from "@/stores";
import { OverlayCloseContext } from "@/components/Project/ProjectSection";
import ProjectTypes from "@/components/Project/ProjectTypes";
import Dialog from "@/components/common/Dialog";

const ProjectTypeSelection = ({
  onNext,
}: {
  onNext: (projectType: ProjectType) => void;
}) => {
  const { close } = useContext(OverlayCloseContext);
  const { selectedProjectType } = useSelectedProjectType();

  return (
    <Dialog size="large">
      <ProjectTypes />

      <Dialog.ButtonContainer>
        <Dialog.Button onClick={() => close && close()}>닫기</Dialog.Button>

        <Dialog.Button
          cssOverlap={css`
            ${selectedProjectType === null && "pointer-events: none;"}
          `}
          onClick={() => onNext(selectedProjectType!)}
        >
          다음으로
        </Dialog.Button>
      </Dialog.ButtonContainer>
    </Dialog>
  );
};

export default ProjectTypeSelection;
