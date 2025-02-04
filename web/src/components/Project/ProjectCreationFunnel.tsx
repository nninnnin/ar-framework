"use client";

import React from "react";
import { css } from "@emotion/react";
import { useFunnel } from "@use-funnel/browser";

import ProjectTypeSelection from "@/components/Project/ProjectTypeSelection";
import ProjectModelSelection from "@/components/Project/ProjectModelSelection";
import { 모델선택, 프로젝트타입선택 } from "@/types/projectCreation";
import { ProjectType } from "@/types/project";

const ProjectCreationFunnel = () => {
  const funnel = useFunnel<{
    프로젝트타입선택: 프로젝트타입선택;
    모델선택: 모델선택;
  }>({
    id: "project-creation-funnel",
    initial: {
      step: "프로젝트타입선택",
      context: {
        projectType: "위치기반 AR",
        glbModels: [],
      },
    },
  });

  const addModelsOnProject = () => {};

  return (
    <funnel.Render
      프로젝트타입선택={({ history }) => (
        <ProjectCreationFunnel.Container>
          <ProjectTypeSelection
            onNext={(projectType: ProjectType) =>
              history.push("모델선택", { glbModels: [] })
            }
          />
        </ProjectCreationFunnel.Container>
      )}
      모델선택={({ context, history }) => (
        <ProjectCreationFunnel.Container>
          <ProjectModelSelection
            onNext={() => addModelsOnProject()}
            onPrevious={() => {
              history.back();
            }}
          />
        </ProjectCreationFunnel.Container>
      )}
    />
  );
};

ProjectCreationFunnel.Container = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      css={css`
        background-color: #fff;
        border: 1px solid #000;

        display: flex;

        width: 800px;
        height: 500px;
      `}
    >
      {children}
    </div>
  );
};

export default ProjectCreationFunnel;
