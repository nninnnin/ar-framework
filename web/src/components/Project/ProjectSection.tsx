import dynamic from "next/dynamic";
import { css } from "@emotion/react";
import { useOverlay } from "@toss/use-overlay";
import React, { createContext } from "react";

import ProjectList from "@/components/Project/ProjectList";
import ProjectItem from "@/components/Project/ProjectItem";
import Overlay from "@/components/common/Overlay";

import { useSelectedGroup } from "@/hooks/useSelectedGroup";
import useProjects from "@/hooks/useProjects";
import { ProjectFormatted } from "@/types/project";
import ProjectDetailsDialog from "@/components/Project/ProjectDetailsDialog";
import Plus from "@/components/common/icons/Plus";

const ProjectCreationFunnel = dynamic(
  () =>
    import(
      "@/components/Project/ProjectCreationFunnel"
    )
);

export const OverlayCloseContext = createContext<{
  close: null | (() => void);
}>({ close: null });

const ProjectSection = () => {
  const { selectedGroup } = useSelectedGroup();
  const { data: projects } = useProjects({
    groupName: selectedGroup?.name ?? "",
  });

  const overlay = useOverlay();

  const handleCreationClick = () => {
    overlay.open(({ isOpen, close }) => {
      return (
        <Overlay isOpen={isOpen}>
          <OverlayCloseContext.Provider
            value={{ close }}
          >
            <ProjectCreationFunnel />
          </OverlayCloseContext.Provider>
        </Overlay>
      );
    });
  };

  const handleProjectItemClick = (
    projectUid: string
  ) => {
    overlay.open(({ close, isOpen }) => {
      return (
        <Overlay isOpen={isOpen}>
          <OverlayCloseContext.Provider
            value={{ close }}
          >
            <ProjectDetailsDialog
              projectUid={projectUid}
              groupName={selectedGroup?.name ?? ""}
            />
          </OverlayCloseContext.Provider>
        </Overlay>
      );
    });
  };

  return (
    <div
      css={css`
        flex: 1;
        padding: 1em;

        user-select: none;
      `}
    >
      <h3
        css={css`
          font-size: 1em;
        `}
      >
        {selectedGroup?.name}
      </h3>

      <ProjectList>
        <ProjectItem
          type="creation"
          onClick={handleCreationClick}
        >
          <Plus />
        </ProjectItem>

        {projects &&
          projects.map((project: ProjectFormatted) => {
            return (
              <ProjectItem
                key={project.uid}
                onClick={() =>
                  handleProjectItemClick(project.uid)
                }
              >
                <>
                  {project.name}

                  <div
                    css={css`
                      position: absolute;
                      top: 0;
                      right: 0;

                      border: 1px solid black;
                      border-top: none;
                      border-right: none;

                      padding: 0.5em;
                      padding-left: 0.7em;
                      padding-right: 0.7em;

                      font-size: 0.7em;
                    `}
                  >
                    {project.projectType.replace(
                      "AR",
                      ""
                    )}
                  </div>
                </>
              </ProjectItem>
            );
          })}
      </ProjectList>
    </div>
  );
};

export default ProjectSection;
