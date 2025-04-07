import React from "react";
import { css } from "@emotion/react";
import { v4 as uuidv4 } from "uuid";

import { isGLBFile } from "@/features/glbModel/utils";
import { useEditableGlbModels } from "@/features/glbModel/store/editableGlbModels";

const ModelUploader = () => {
  const { addEditableGlbModel } =
    useEditableGlbModels();

  return (
    <div
      css={css`
        background-color: blanchedalmond;
        color: black;

        flex: 1;

        display: flex;
        justify-content: center;
        align-items: center;
      `}
      onDrop={(e) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];

        if (!isGLBFile(file)) {
          alert("GLB 파일이 아닙니다.");
          return;
        }

        addEditableGlbModel({
          uid: uuidv4(),
          name: file.name,
          file,
        });
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      GLB 파일을 올려보세요.
    </div>
  );
};

export default ModelUploader;
