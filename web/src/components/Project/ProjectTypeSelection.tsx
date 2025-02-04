"use client";

import React, { useContext } from "react";
import { OverlayCloseContext } from "@/components/Project/ProjectSection";
import ProjectTypes from "@/components/Project/ProjectTypes";
import { css } from "@emotion/react";
import { ProjectType } from "@/types/project";
import { useSelectedProjectType } from "@/stores";
import FunnelButtonContainer from "@/components/common/funnel/FunnelButtonContainer";

const ProjectTypeSelection = ({
  onNext,
}: {
  onNext: (projectType: ProjectType) => void;
}) => {
  const { close } = useContext(OverlayCloseContext);
  const { selectedProjectType } = useSelectedProjectType();

  return (
    <div
      css={css`
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
      `}
    >
      <ProjectTypes />

      <FunnelButtonContainer>
        <div
          css={css`
            flex: 1;
            padding: 1em;

            text-align: center;
            background-color: #fff;

            cursor: pointer;
          `}
          onClick={() => close && close()}
        >
          닫기
        </div>

        <div
          css={css`
            flex: 1;
            padding: 1em;

            text-align: center;
            background-color: #fff;

            cursor: pointer;

            ${selectedProjectType === null && "pointer-events: none;"}
          `}
          onClick={() => onNext(selectedProjectType!)}
        >
          다음으로
        </div>
      </FunnelButtonContainer>
    </div>
  );
};

export default ProjectTypeSelection;
