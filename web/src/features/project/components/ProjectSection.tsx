import dynamic from "next/dynamic";
import { css } from "@emotion/react";
import { useOverlay } from "@toss/use-overlay";
import React, { createContext } from "react";
import { useSelectedGroup } from "@/features/group/hooks/useSelectedGroup";
import useProjects from "@/features/project/hooks/useProjects";
import ProjectList from "@/features/project/components/ProjectList";
import Plus from "@/shared/components/icons/Plus";
import ProjectItem from "@/features/project/components/ProjectItem";
import { ProjectFormatted } from "@/features/project/types/project";
import Overlay from "@/shared/components/Overlay";
import ProjectModelEditingDialog from "@/features/project/components/ProjectModelEditingDialog";
import { designTokens } from "@/shared/styles/tokens";

const ProjectDetailsDialog = dynamic(
  () =>
    import(
      "@/features/project/components/ProjectDetailsDialog"
    ),
  {
    ssr: false,
  }
);

const ProjectCreationFunnel = dynamic(
  () =>
    import(
      "@/features/project/components/ProjectCreationFunnel"
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
        <ProjectItem
          type="creation"
          onClick={handleCreationClick}
        >
          <Plus />
        </ProjectItem>

        {projects &&
          projects.map(
            (projectItem: ProjectFormatted) => {
              return (
                <ProjectSection.ProjectDetailsItem
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

ProjectSection.ProjectDetailsItem = ({
  projectItem,
}: {
  projectItem: ProjectFormatted;
}) => {
  const overlay = useOverlay();
  const { selectedGroup } = useSelectedGroup();

  const onModifyClick = (projectId: string) => () => {
    overlay.open(({ close, isOpen }) => (
      <Overlay isOpen={isOpen}>
        <ProjectModelEditingDialog
          projectId={projectId}
          onClose={() => close()}
        />
      </Overlay>
    ));
  };

  const onConnectClick = (projectUid: string) => {
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

  const arColor =
    designTokens.colors.arTypes[
      projectItem.projectType
    ];

  const badge = (
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
        padding-right: 0.5em;

        font-size: 0.7em;

        display: flex;
        align-items: center;
        gap: 4px;
      `}
    >
      {projectItem.projectType.replace("AR", "")}

      <svg width="10" height="10" viewBox="0 0 10 10">
        <circle cx="5" cy="5" r="3.5" fill={arColor} />
      </svg>
    </div>
  );

  return (
    <ProjectItem>
      {projectItem.name}

      {badge}

      <div
        className="project-item-button-container"
        css={css`
          position: absolute;
          bottom: 0;
          right: 0;

          width: 80%;
          margin: 0 auto;

          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1px;

          background-color: #000000;

          border-top: 1px solid #000000;
          border-left: 1px solid #000000;

          visibility: hidden;
          pointer-events: none;
        `}
      >
        <div
          css={css`
            padding: 0.7em;
            background-color: white;
            flex: 1;
            color: black;
            font-size: 0.8em;
            cursor: pointer;

            &:hover {
              background-color: #f1f1f1;
            }
          `}
          onClick={onModifyClick(projectItem.uid)}
        >
          수정
        </div>

        <div
          css={css`
            padding: 0.7em;
            background-color: white;
            flex: 1;
            color: black;
            font-size: 0.8em;
            cursor: pointer;

            &:hover {
              background-color: #f1f1f1;
            }
          `}
          onClick={() =>
            onConnectClick(projectItem.uid)
          }
        >
          접속
        </div>
      </div>
    </ProjectItem>
  );
};

export default ProjectSection;
