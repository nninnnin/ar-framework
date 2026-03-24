import dynamic from "next/dynamic";
import { css } from "@emotion/react";
import React, { createContext } from "react";
import { useOverlay } from "@toss/use-overlay";
import { AnimatePresence, motion } from "motion/react";

import { useSelectedGroup } from "@/features/group/hooks/useSelectedGroup";
import useInitialProjectUids from "@/features/project/hooks/useInitialProjectUids";
import ProjectItem from "@/features/project/components/projectItem";
import useProjects from "@/features/project/hooks/useProjects";
import ProjectList from "@/features/project/components/ProjectList";
import ProjectItemContainer from "@/features/project/components/projectItem/Container";
import { ProjectFormatted } from "@/entities/project/types";
import Overlay from "@/shared/components/Overlay";
import Plus from "@/shared/components/icons/Plus";

const ProjectCreationFunnel = dynamic(
  () =>
    import("@/features/projectCreation/components/ProjectCreationFunnel"),
  { ssr: false },
);

export const OverlayCloseContext = createContext<{
  close: null | (() => void);
}>({ close: null });

const ProjectSection = () => {
  const { selectedGroup } = useSelectedGroup();

  const { data: projects } = useProjects({
    groupName: selectedGroup?.name ?? "",
  });

  console.log(projects);

  const initialUids = useInitialProjectUids(projects);

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
          testId="add-project-btn"
        >
          <Plus />
        </ProjectItemContainer>

        <AnimatePresence>
          {projects &&
            projects.map(
              (projectItem: ProjectFormatted) => {
                return (
                  <motion.div
                    key={projectItem.uid}
                    initial={
                      initialUids.current
                        ? { opacity: 0, scale: 0.85 }
                        : false
                    }
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.94,
                      ease: "anticipate",
                    }}
                  >
                    <ProjectItem
                      projectItem={projectItem}
                    />
                  </motion.div>
                );
              },
            )}
        </AnimatePresence>
      </ProjectList>
    </div>
  );
};

export default ProjectSection;
