import React from "react";
import { css } from "@emotion/react";
import { v4 as uuidv4 } from "uuid";

import { isGLBFile } from "@/utils";
import { useAddedModels } from "@/stores";

const ModelUploader = () => {
  const { addModel } = useAddedModels();

  return (
    <div
      css={css`
        background-color: blanchedalmond;

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

        addModel({
          id: uuidv4(),
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
