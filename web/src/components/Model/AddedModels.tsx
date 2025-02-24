import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { css } from "@emotion/react";

import {
  useAddedModels,
  useSelectedModelIndex,
} from "@/stores";
import { useIsFetching } from "@tanstack/react-query";
import { QueryKeys } from "@/constants/queryKeys";

const AddedModels = () => {
  const containerRef = useRef<HTMLDivElement | null>(
    null
  );

  const { addedModels } = useAddedModels();
  const { selectedModelIndex, setSelectedModelIndex } =
    useSelectedModelIndex();

  const isGlbFetching = useIsFetching({
    queryKey: [QueryKeys.GlbModels],
  });

  useEffect(() => {
    const AddedModelContainers =
      document.querySelector(
        "#added-models-container"
      );

    if (AddedModelContainers) {
      AddedModelContainers.scrollTo(
        0,
        AddedModelContainers.scrollHeight
      );
    }
  }, [addedModels]);

  useLayoutEffect(() => {
    const modelSelectionContainer =
      document.getElementById(
        "model-editor-container"
      );

    if (
      containerRef.current &&
      modelSelectionContainer
    ) {
      containerRef.current.style.height =
        getComputedStyle(
          modelSelectionContainer
        ).height;
    }
  }, []);

  const listRendered = addedModels.map(
    (model, index) => {
      return (
        <AddedModels.Item
          key={model?.id ?? `model-container-${index}`}
          onClick={() => setSelectedModelIndex(index)}
          isSelected={selectedModelIndex === index}
        >
          {model?.file.name ?? "새로운 모델"}
        </AddedModels.Item>
      );
    }
  );

  return (
    <AddedModels.Container ref={containerRef}>
      {isGlbFetching ? (
        <AddedModels.Item
          onClick={() => {}}
          isSelected={true}
        >
          {" "}
        </AddedModels.Item>
      ) : (
        listRendered
      )}
    </AddedModels.Container>
  );
};

AddedModels.Container = forwardRef(
  (
    {
      children,
    }: {
      children: React.ReactNode;
    },
    ref: React.Ref<HTMLDivElement>
  ) => {
    return (
      <div
        id="added-models-container"
        css={css`
          width: 200px;
          height: 0px;
          background-color: beige;

          border-left: 1px solid #000;

          overflow-y: scroll;
        `}
        ref={ref}
      >
        {children}
      </div>
    );
  }
);

AddedModels.Item = ({
  children,
  isSelected,
  onClick,
}: {
  children: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      css={css`
        height: 170px;

        background-color: ${isSelected
          ? "black"
          : "white"};
        color: ${isSelected ? "white" : "black"};

        font-size: 1.5em;
        padding: 1em;
        text-align: center;

        display: flex;
        justify-content: center;
        align-items: center;

        border-bottom: 1px solid #000;
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default AddedModels;
