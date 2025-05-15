import dynamic from "next/dynamic";
import { css } from "@emotion/react";
import React, { createContext } from "react";
import { useOverlay } from "@toss/use-overlay";

import { useSelectedGroup } from "@/features/group/hooks/useSelectedGroup";
import ProjectItem from "@/features/project/components/projectItem";
import useProjects from "@/features/project/hooks/useProjects";
import ProjectList from "@/features/project/components/ProjectList";
import ProjectItemContainer from "@/features/project/components/projectItem/Container";
import { ProjectFormatted } from "@/features/project/types/project";
import Overlay from "@/shared/components/Overlay";
import Plus from "@/shared/components/icons/Plus";

const ProjectCreationFunnel = dynamic(
  () =>
    import(
      "@/features/projectCreation/components/ProjectCreationFunnel"
    ),
  { ssr: false }
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
        <ProjectItemContainer
          type="creation"
          onClick={handleCreationClick}
        >
          <Plus />
        </ProjectItemContainer>

        {projects &&
          projects.map(
            (projectItem: ProjectFormatted) => {
              return (
                <ProjectItem
                  key={projectItem.uid}
                  projectItem={projectItem}
                />
              );
            }
          )}
      </ProjectList>
    </div>
  );
};

export default ProjectSection;
