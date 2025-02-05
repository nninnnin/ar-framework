import React from "react";
import { css } from "@emotion/react";

import ModelViewer from "@/components/Model/ModelViewer";
import ModelUploader from "@/components/Model/ModelUploader";
import { useAddedModels, useSelectedModelIndex } from "@/stores";
import AddedModels from "@/components/Model/AddedModels";
import FunnelButton from "@/components/common/funnel/FunnelButton";
import FunnelButtonContainer from "@/components/common/funnel/FunnelButtonContainer";
import { ProjectType } from "@/types/project";

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

  console.log("p type", projectType);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
      `}
    >
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

      <FunnelButtonContainer>
        <FunnelButton onClick={onPrevious}>돌아가기</FunnelButton>
        <FunnelButton
          onClick={() =>
            onNext(addedModels.filter((m) => m).map((m) => m!.file))
          }
        >
          다음으로
        </FunnelButton>
      </FunnelButtonContainer>
    </div>
  );
};

export default ProjectModelSelection;
