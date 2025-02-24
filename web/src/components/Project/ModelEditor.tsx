import React from "react";
import { css } from "@emotion/react";

import ModelViewer from "@/components/Model/ModelViewer";
import ModelUploader from "@/components/Model/ModelUploader";
import AddedModels from "@/components/Model/AddedModels";
import {
  useAddedModels,
  useSelectedModelIndex,
} from "@/stores";
import { useIsFetching } from "@tanstack/react-query";
import { QueryKeys } from "@/constants/queryKeys";

const ModelEditor = () => {
  const { selectedModelIndex } =
    useSelectedModelIndex();
  const { addedModels } = useAddedModels();

  const selectedModel =
    addedModels[selectedModelIndex];

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

      <AddedModels />
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
