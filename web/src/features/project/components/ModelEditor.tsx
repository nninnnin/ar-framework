import React from "react";
import { css } from "@emotion/react";

import ModelViewer from "@/features/glbModel/components/ModelViewer";
import ModelUploader from "@/features/glbModel/components/ModelUploader";
import ProjectModelList from "@/features/glbModel/components/ProjectModelList";

import { useIsFetching } from "@tanstack/react-query";
import { QueryKeys } from "@/shared/constants/queryKeys";
import {
  useProjectGlbModels,
  useSelectedModelIndex,
} from "@/features/project/store";

const ModelEditor = () => {
  const { selectedModelIndex } =
    useSelectedModelIndex();
  const { projectGlbModels } = useProjectGlbModels();

  const selectedModel =
    projectGlbModels[selectedModelIndex];

  const isGlbFetching = useIsFetching({
    queryKey: [QueryKeys.GlbModels],
  });

  return (
    <ModelEditor.Container>
      {isGlbFetching ? (
        <div
          css={css`
            flex: 1;
            height: 1;
            background-color: orange;

            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          모델 가져오는 중..
        </div>
      ) : selectedModel ? (
        <ModelViewer
          modelSource={URL.createObjectURL(
            selectedModel.file
          )}
        />
      ) : (
        <ModelUploader />
      )}

      <ProjectModelList />
    </ModelEditor.Container>
  );
};

ModelEditor.Container = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      id="model-editor-container"
      css={css`
        display: flex;
        width: 100%;
        flex: 1;
      `}
    >
      {children}
    </div>
  );
};

export default ModelEditor;
