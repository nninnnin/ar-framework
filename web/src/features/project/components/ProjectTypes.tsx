import React from "react";
import { css } from "@emotion/react";

import useProjectTypes from "@/features/project/hooks/useProjectTypes";
import { useSelectedProjectType } from "@/features/project/store";

const ProjectTypes = () => {
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

          return (
            <li
              key={projectType.id}
              css={css`
                &:hover {
                  background-color: #f0f0f0;
                }

                background-color: ${selectedProjectType ===
                projectType.name
                  ? "black !important"
                  : "white"};

                color: ${selectedProjectType ===
                projectType.name
                  ? "white"
                  : "black"};

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

export default ProjectTypes;
