import React, { useEffect } from "react";
import { css } from "@emotion/react";

import { useAddedModels, useSelectedModelIndex } from "@/stores";

const AddedModels = () => {
  const { addedModels } = useAddedModels();
  const { selectedModelIndex, setSelectedModelIndex } = useSelectedModelIndex();

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
        height: 445.5px;
        background-color: beige;

        border-left: 1px solid #000;

        overflow-y: scroll;
      `}
    >
      {addedModels.map((model, index) => {
        const isSelected = selectedModelIndex === index;

        return (
          <div
            key={model?.id ?? `model-container-${index}`}
            css={css`
              height: 170px;

              background-color: ${isSelected ? "black" : "white"};
              color: ${isSelected ? "white" : "black"};

              font-size: 1.5em;
              padding: 1em;
              text-align: center;

              display: flex;
              justify-content: center;
              align-items: center;

              border-bottom: 1px solid #000;
            `}
            onClick={() => setSelectedModelIndex(index)}
          >
            {model?.file.name ?? "새로운 모델"}
          </div>
        );
      })}
    </div>
  );
};

export default AddedModels;
