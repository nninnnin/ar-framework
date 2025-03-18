import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import { css } from "@emotion/react";
import { useIsFetching } from "@tanstack/react-query";

import { QueryKeys } from "@/shared/constants/queryKeys";
import {
  useProjectGlbModels,
  useSelectedModelIndex,
} from "@/features/project/store";

const ProjectModelList = () => {
  const containerRef = useRef<HTMLDivElement | null>(
    null
  );

  const { projectGlbModels } = useProjectGlbModels();
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
  }, [projectGlbModels]);

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

  const listRendered = projectGlbModels.map(
    (model, index) => {
      return (
        <ProjectModelList.Item
          key={model?.id ?? `model-container-${index}`}
          onClick={() => setSelectedModelIndex(index)}
          isSelected={selectedModelIndex === index}
        >
          {model?.file.name ?? "새로운 모델"}
        </ProjectModelList.Item>
      );
    }
  );

  return (
    <ProjectModelList.Container ref={containerRef}>
      {isGlbFetching ? (
        <ProjectModelList.Item
          onClick={() => {}}
          isSelected={true}
        >
          {" "}
        </ProjectModelList.Item>
      ) : (
        listRendered
      )}
    </ProjectModelList.Container>
  );
};

ProjectModelList.Container = forwardRef(
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

ProjectModelList.Item = ({
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

export default ProjectModelList;
