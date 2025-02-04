import React from "react";
import { css } from "@emotion/react";

import { useSelectedGroup } from "@/hooks/useSelectedGroup";
import ProjectList from "@/components/home/ProjectList";
import ProjectItem from "@/components/home/ProjectItem";
import useProjects from "@/hooks/useProjects";
import { ProjectFormatted } from "@/types/project";
import useCreateProject from "@/hooks/useCreateProject";
import Overlay from "@/components/common/Overlay";
import { useOverlay } from "@toss/use-overlay";
import CreationDialog from "@/components/common/CreationDialog";

const ProjectSection = () => {
  const { selectedGroup } = useSelectedGroup();
  const { data: projects } = useProjects();

  const overlay = useOverlay();

  const handleClick = () => {
    overlay.open(({ isOpen, close }) => {
      return (
        <Overlay isOpen={isOpen}>
          <CreationDialog
            creationHook={useCreateProject}
            message="프로젝트를 만들어주세요"
            close={close}
          />
        </Overlay>
      );
    });
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
        <ProjectItem type="creation" onClick={handleClick}>
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
              <ProjectItem key={project.uid} onClick={handleClick}>
                {project.name}
              </ProjectItem>
            );
          })}
      </ProjectList>
    </div>
  );
};

export default ProjectSection;
