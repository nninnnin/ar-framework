import { ProjectFormatted } from "@/features/project/types/project";
import EditButton from "@/features/project/components/projectItem/EditButton";
import ProjectItemBadge from "@/features/project/components/projectItem/Badge";
import RemoveButton from "@/features/project/components/projectItem/RemoveButton";
import { ProjectItemContext } from "@/features/project/hooks/useProjectUidContext";
import ConnectButton from "@/features/project/components/projectItem/ConnectButton";
import ProjectItemContainer from "@/features/project/components/projectItem/Container";
import ButtonContainer from "@/features/project/components/projectItem/ButtonContainer";
import { css } from "@emotion/react";
import LockButton from "@/features/project/components/projectItem/LockButton";
import UnlockButton from "@/features/project/components/projectItem/UnlockButton";

const ProjectItem = ({
  projectItem,
  onClick = () => {},
}: {
  projectItem: ProjectFormatted;
  onClick?: () => void;
}) => {
  const isLocked = projectItem.isLocked;

  return (
    <ProjectItemContext.Provider
      value={{ projectItem }}
    >
      <ProjectItemContainer
        onClick={onClick}
        cssOverlap={css`
          ${isLocked && "background-color: #c7c7c7;"}
        `}
      >
        {!isLocked && <RemoveButton />}
        {isLocked && (
          <div
            css={css`
              position: absolute;
              top: 4px;
              right: 7px;

              font-size: 1.2em;
            `}
          >
            🔒
          </div>
        )}

        <ProjectItem.Name>
          {projectItem.name}
        </ProjectItem.Name>

        <div
          css={css`
            display: flex;
            align-items: center;
            position: absolute;
            top: 0;
            left: 0;

            background-color: #fff;

            border: 0px;
            border-bottom: 1px;
            border-right: 1px;
            border-style: solid;
            border-color: black;

            font-size: 0.7em;

            padding-right: 0.5em;
          `}
        >
          <ProjectItemBadge
            projectType={projectItem.projectType.name}
          />

          <div>{projectItem.templateId}</div>
        </div>

        <ButtonContainer>
          {!isLocked && (
            <>
              <LockButton />
              <EditButton />
            </>
          )}

          {isLocked && <UnlockButton />}

          <ConnectButton />
        </ButtonContainer>
      </ProjectItemContainer>
    </ProjectItemContext.Provider>
  );
};

ProjectItem.Name = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <span>{children}</span>;
};

export default ProjectItem;
