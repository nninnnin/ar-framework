import React from "react";
import { css } from "@emotion/react";

import ModelViewer from "@/features/glbModel/components/ModelViewer";
import ModelUploader from "@/features/glbModel/components/ModelUploader";
import EditableGlbModelList from "@/features/glbModel/components/EditableGlbModelList";

import { useIsFetching } from "@tanstack/react-query";
import { QueryKeys } from "@/shared/constants/queryKeys";
import { useSelectedModelIndex } from "@/features/project/store";
import { useEditableGlbModels } from "@/features/glbModel/store/editableGlbModels";

const ModelEditor = () => {
  const { selectedModelIndex } =
    useSelectedModelIndex();
  const { editableGlbModels } = useEditableGlbModels();

  const selectedModel =
    editableGlbModels[selectedModelIndex];

  const isGlbFetching = useIsFetching({
    queryKey: [QueryKeys.GlbModels],
  });

  const spinner = (
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
  );

  const contents = (
    <>
      {selectedModel ? (
        <ModelViewer glbModel={selectedModel} />
      ) : (
        <ModelUploader />
      )}
    </>
  );

  return (
    <ModelEditor.Container>
      {isGlbFetching ? spinner : contents}

      <EditableGlbModelList />
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
