import React from "react";
import { css } from "@emotion/react";

import ModelViewer from "@/components/Model/ModelViewer";
import ModelUploader from "@/components/Model/ModelUploader";
import { useAddedModels, useSelectedModelIndex } from "@/stores";
import AddedModels from "@/components/Model/AddedModels";
import { ProjectType } from "@/types/project";
import Dialog from "@/components/common/Dialog";

const ProjectModelSelection = ({
  projectType,
  onNext,
  onPrevious,
}: {
  projectType: ProjectType;
  onNext: (glbModels: File[]) => void;
  onPrevious: () => void;
}) => {
  const { selectedModelIndex } = useSelectedModelIndex();
  const { addedModels } = useAddedModels();

  const selectedModel = addedModels[selectedModelIndex];

  return (
    <Dialog size="large">
      <div
        css={css`
          display: flex;
          width: 100%;
          height: 100%;
        `}
      >
        {selectedModel ? (
          <ModelViewer modelSource={URL.createObjectURL(selectedModel.file)} />
        ) : (
          <ModelUploader />
        )}

        <AddedModels />
      </div>

      <Dialog.ButtonContainer>
        <Dialog.Button onClick={onPrevious}>돌아가기</Dialog.Button>
        <Dialog.Button
          onClick={() =>
            onNext(addedModels.filter((m) => m).map((m) => m!.file))
          }
        >
          다음으로
        </Dialog.Button>
      </Dialog.ButtonContainer>
    </Dialog>
  );
};

export default ProjectModelSelection;
