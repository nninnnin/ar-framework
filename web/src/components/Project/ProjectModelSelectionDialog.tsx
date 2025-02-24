import React from "react";

import Dialog from "@/components/common/Dialog";
import ModelEditor from "@/components/Project/ModelEditor";

const ProjectModelSelectionDialog = ({
  onClose,
  onPrevious,
  onNext,
  headerLabel,
}: {
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  headerLabel: string;
}) => {
  return (
    <Dialog size="large">
      <Dialog.Header handleCloseClick={onClose}>
        <Dialog.HeaderLabel>
          {headerLabel}
        </Dialog.HeaderLabel>
      </Dialog.Header>

      <ModelEditor />

      <Dialog.ButtonContainer>
        <Dialog.Button onClick={onPrevious}>
          돌아가기
        </Dialog.Button>

        <Dialog.Button onClick={onNext}>
          다음으로
        </Dialog.Button>
      </Dialog.ButtonContainer>
    </Dialog>
  );
};

export default ProjectModelSelectionDialog;
