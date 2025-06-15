import React from "react";
import { css } from "@emotion/react";
import { ProjectType } from "@/features/project/types/project";
import { designTokens } from "@/shared/styles/tokens";

const ProjectItemBadge = ({
  projectType,
}: {
  projectType: ProjectType;
}) => {
  const color =
    designTokens.colors.arTypes[projectType];

  return (
    <div
      css={css`
        padding: 0.5em;
        padding-left: 0.7em;
        padding-right: 0.5em;

        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        gap: 4px;
      `}
    >
      {projectType.replace("AR", "")}

      <svg width="10" height="10" viewBox="0 0 10 10">
        <circle cx="5" cy="5" r="3.5" fill={color} />
      </svg>
    </div>
  );
};

export default ProjectItemBadge;
