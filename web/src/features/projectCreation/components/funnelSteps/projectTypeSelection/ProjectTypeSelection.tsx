import React from "react";
import { css } from "@emotion/react";

import useProjectTypes from "@/features/project/hooks/useProjectTypes";
import { useSelectedProjectType } from "@/features/project/store";
import { designTokens } from "@/shared/styles/tokens";

const ProjectTypeSelection = () => {
  const { data: projectTypes } = useProjectTypes();

  const {
    selectedProjectType,
    setSelectedProjectType,
  } = useSelectedProjectType();

  return (
    <ul
      css={css`
        display: flex;
        flex: 1;
      `}
    >
      {projectTypes &&
        projectTypes.map((projectType, index) => {
          const handleItemClick = () =>
            setSelectedProjectType(projectType.name);

          const isSelected =
            selectedProjectType === projectType.name;

          const arThemeColor =
            designTokens.colors.arTypes[
              projectType.name
            ];

          return (
            <li
              key={`selection-${projectType.name}`}
              css={css`
                &:hover {
                  ${isSelected
                    ? ""
                    : css`
                        background-color: #f9f9f9;
                      `}
                }

                box-shadow: ${isSelected
                  ? `0px 0px 60px 0px ${arThemeColor} inset !important`
                  : "none"};

                border-right: 1px solid black;

                &:last-child {
                  border-right: none;
                }

                font-weight: bold;
                font-size: 1.3em;
                flex: 1;

                list-style: none;

                display: flex;
                justify-content: center;
                align-items: center;

                cursor: pointer;
              `}
              onClick={handleItemClick}
            >
              {projectType.name}
            </li>
          );
        })}
    </ul>
  );
};

export default ProjectTypeSelection;
