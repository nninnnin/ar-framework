import React from "react";

import ProjectItemContainer from "@/features/project/components/projectItem/Container";
import { ProjectFormatted } from "@/features/project/types/project";
import ProjectItemBadge from "@/features/project/components/projectItem/Badge";
import EditButton from "@/features/project/components/projectItem/EditButton";
import ConnectButton from "@/features/project/components/projectItem/ConnectButton";
import ButtonContainer from "@/features/project/components/projectItem/ButtonContainer";

const ProjectItem = ({
  projectItem,
  onClick = () => {},
}: {
  projectItem: ProjectFormatted;
  onClick?: () => void;
}) => {
  return (
    <ProjectItemContainer onClick={onClick}>
      <ProjectItem.Name>
        {projectItem.name}
      </ProjectItem.Name>

      <ProjectItemBadge
        projectType={projectItem.projectType}
      />

      <ButtonContainer>
        <EditButton projectItemUid={projectItem.uid} />
        <ConnectButton
          projectItemUid={projectItem.uid}
        />
      </ButtonContainer>
    </ProjectItemContainer>
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
