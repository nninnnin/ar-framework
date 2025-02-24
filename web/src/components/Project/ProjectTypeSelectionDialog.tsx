"use client";

import React from "react";

import { ProjectType } from "@/types/project";
import { useSelectedProjectType } from "@/stores";
import ProjectTypes from "@/components/Project/ProjectTypes";
import Dialog from "@/components/common/Dialog";

const ProjectTypeSelectionDialog = ({
  onNext,
  onClose,
}: {
  onNext: (projectType: ProjectType) => void;
  onClose: () => void;
}) => {
  const { selectedProjectType } =
    useSelectedProjectType();

  return (
    <Dialog size="large">
      <Dialog.Header handleCloseClick={onClose}>
        <Dialog.HeaderLabel>
          프로젝트 타입 선택
        </Dialog.HeaderLabel>
      </Dialog.Header>

      <Dialog.ContentsContainer>
        <ProjectTypes />
      </Dialog.ContentsContainer>

      <Dialog.ButtonContainer>
        <Dialog.Button
          disabled={true}
          onClick={() => {}}
        >
          {""}
        </Dialog.Button>
        <Dialog.Button
          disabled={selectedProjectType === null}
          onClick={() => onNext(selectedProjectType!)}
        >
          다음으로
        </Dialog.Button>
      </Dialog.ButtonContainer>
    </Dialog>
  );
};

export default ProjectTypeSelectionDialog;
