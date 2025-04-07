import React, {
  forwardRef,
  MouseEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { css } from "@emotion/react";
import { useIsFetching } from "@tanstack/react-query";

import { QueryKeys } from "@/shared/constants/queryKeys";
import { useSelectedModelIndex } from "@/features/project/store";
import useProjectModelDifference from "@/features/glbModel/hooks/useProjectModelDifference";
import { useEditableGlbModels } from "@/features/glbModel/store/editableGlbModels";

const EditableGlbModelList = () => {
  const containerRef = useRef<HTMLDivElement | null>(
    null
  );

  const { selectedModelIndex, setSelectedModelIndex } =
    useSelectedModelIndex();

  const isGlbFetching = useIsFetching({
    queryKey: [QueryKeys.GlbModels],
  });

  const { differenceDirection } =
    useProjectModelDifference();

  const { editableGlbModels, removeEditables } =
    useEditableGlbModels();

  useEffect(() => {
    const AddedModelContainers =
      document.querySelector(
        "#added-models-container"
      );

    if (!AddedModelContainers) return;

    if (differenceDirection === "increase") {
      AddedModelContainers.scrollTo(
        0,
        AddedModelContainers.scrollHeight
      );
    } else if (differenceDirection === "decrease") {
      AddedModelContainers.scrollTo(0, 0);
    }
  }, [editableGlbModels.length, differenceDirection]);

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

  const listRendered = editableGlbModels.map(
    (model, index) => {
      const handleRemoveClick = (e: MouseEvent) => {
        e.stopPropagation();
        removeEditables(model!.uid);
      };

      const itemLabel = model.name;

      return (
        <EditableGlbModelList.Item
          key={model.uid}
          onClick={() => setSelectedModelIndex(index)}
          isSelected={selectedModelIndex === index}
        >
          <span>{itemLabel}</span>

          <EditableGlbModelList.RemoveItemButton
            handleClick={handleRemoveClick}
          />
        </EditableGlbModelList.Item>
      );
    }
  );

  return (
    <EditableGlbModelList.Container ref={containerRef}>
      {isGlbFetching ? (
        <EditableGlbModelList.ItemSkeleton />
      ) : (
        <>
          <>{listRendered}</>
          <EditableGlbModelList.AddEditableItem />
        </>
      )}
    </EditableGlbModelList.Container>
  );
};

EditableGlbModelList.AddEditableItem = () => {
  const { editableGlbModels } = useEditableGlbModels();

  const { selectedModelIndex, setSelectedModelIndex } =
    useSelectedModelIndex();

  return (
    <EditableGlbModelList.Item
      key={`add-model-item`}
      onClick={() => {
        setSelectedModelIndex(
          editableGlbModels.length
        );
      }}
      isSelected={
        selectedModelIndex ===
        (editableGlbModels.length ?? 0)
      }
    >
      <span>
        새로운 모델
        <br />
        추가하기
      </span>
    </EditableGlbModelList.Item>
  );
};

EditableGlbModelList.ItemSkeleton = () => {
  return (
    <EditableGlbModelList.Item
      onClick={() => {}}
      isSelected={true}
    >
      {" "}
    </EditableGlbModelList.Item>
  );
};

EditableGlbModelList.Container = forwardRef(
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

EditableGlbModelList.Item = ({
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

        position: relative;
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

EditableGlbModelList.RemoveItemButton = ({
  handleClick,
}: {
  handleClick: (e: MouseEvent) => void;
}) => {
  return (
    <svg
      onClick={handleClick}
      css={css`
        position: absolute;
        left: 0px;
        top: 0px;

        background-color: black;

        border: 0px;
        border-right: 0.5px;
        border-bottom: 0.5px;
        border-color: white;
        border-style: solid;

        cursor: pointer;
      `}
      width="28"
      height="28"
      viewBox="0 0 100 100"
    >
      <line
        x1="20"
        y1="20"
        x2="80"
        y2="80"
        stroke="white"
        strokeWidth="6"
      />

      <line
        x1="20"
        y1="80"
        x2="80"
        y2="20"
        stroke="white"
        strokeWidth="6"
      />
    </svg>
  );
};

export default EditableGlbModelList;
