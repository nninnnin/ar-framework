import { css } from "@emotion/react";
import React, { createContext, useEffect } from "react";
import { useOverlay } from "@toss/use-overlay";

import ProjectList from "@/components/Project/ProjectList";
import ProjectItem from "@/components/Project/ProjectItem";
import Overlay from "@/components/common/Overlay";

import { useSelectedGroup } from "@/hooks/useSelectedGroup";
import useProjects from "@/hooks/useProjects";
import { ProjectFormatted } from "@/types/project";
import ProjectCreationFunnel from "@/components/Project/ProjectCreationFunnel";

export const OverlayCloseContext = createContext<{
  close: null | (() => void);
}>({ close: null });

const ProjectSection = () => {
  const { selectedGroup } = useSelectedGroup();
  const { data: projects } = useProjects();

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  const overlay = useOverlay();

  const handleCreationClick = () => {
    overlay.open(({ isOpen, close }) => {
      return (
        <Overlay isOpen={isOpen}>
          <OverlayCloseContext.Provider value={{ close }}>
            <ProjectCreationFunnel />
          </OverlayCloseContext.Provider>
        </Overlay>
      );
    });
  };

  const handleProjectItemClick = () => {
    // 프로젝트를 연다
  };

  return (
    <div
      css={css`
        background-color: aliceblue;
        flex: 1;

        padding: 1em;
      `}
    >
      <h3>{selectedGroup?.name}</h3>

      <ProjectList>
        <ProjectItem type="creation" onClick={handleCreationClick}>
          <span
            css={css`
              font-size: 4em;
            `}
          >
            +
          </span>
        </ProjectItem>

        {projects &&
          projects.map((project: ProjectFormatted) => {
            return (
              <ProjectItem key={project.uid} onClick={handleProjectItemClick}>
                {project.name}
              </ProjectItem>
            );
          })}
      </ProjectList>
    </div>
  );
};

export default ProjectSection;
