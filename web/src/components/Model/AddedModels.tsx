import React, { useEffect } from "react";
import { css } from "@emotion/react";

import { useAddedModels, useSelectedModelIndex } from "@/stores";

const AddedModels = () => {
  const { addedModels } = useAddedModels();
  const { setSelectedModelIndex } = useSelectedModelIndex();

  useEffect(() => {
    const AddedModelContainers = document.querySelector(
      "#added-models-container"
    );

    if (AddedModelContainers) {
      AddedModelContainers.scrollTo(0, AddedModelContainers.scrollHeight);
    }
  }, [addedModels]);

  return (
    <div
      id="added-models-container"
      css={css`
        width: 200px;
        height: 100%;
        background-color: beige;

        border-left: 1px solid #000;

        overflow-y: scroll;
      `}
    >
      {addedModels.map((model, index) => {
        const hasModelAdded = model !== null;

        return (
          <div
            key={model?.id ?? `model-container-${index}`}
            css={css`
              background-color: ${hasModelAdded ? "white" : "lightgray"};
              height: 170px;

              display: flex;
              justify-content: center;
              align-items: center;

              border-bottom: 1px solid #000;
              &:last-child {
                border-bottom: none;
              }
            `}
            onClick={() => setSelectedModelIndex(index)}
          >
            {model?.file.name ?? ""}
          </div>
        );
      })}
    </div>
  );
};

export default AddedModels;
