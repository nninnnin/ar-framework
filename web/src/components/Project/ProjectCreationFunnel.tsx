"use client";

import React from "react";
import { css } from "@emotion/react";
import { useFunnel } from "@use-funnel/browser";

import ProjectTypeSelection from "@/components/Project/ProjectTypeSelection";
import ProjectModelSelection from "@/components/Project/ProjectModelSelection";
import {
  모델선택,
  프로젝트명입력,
  프로젝트타입선택,
} from "@/types/projectCreationFunnel";
import { ProjectType } from "@/types/project";

import ProjectRegister from "@/components/Project/ProjectRegister";
import { uploadGlbModels } from "@/utils";
import useCreateProject from "@/hooks/useCreateProject";
import usePostGlbModel from "@/hooks/usePostGlbModel";
import useProjectTypes from "@/hooks/useProjectTypes";
import { useSelectedGroup } from "@/hooks/useSelectedGroup";

const ProjectCreationFunnel = () => {
  const funnel = useFunnel<{
    프로젝트타입선택: 프로젝트타입선택;
    모델선택: 모델선택;
    프로젝트명입력: 프로젝트명입력;
  }>({
    id: "project-creation-funnel",
    initial: {
      step: "프로젝트타입선택",
      context: {},
    },
  });

  const { selectedGroup } = useSelectedGroup();

  const { mutateAsync: postGlbModel } = usePostGlbModel();
  const { data: projectTypes } = useProjectTypes();
  const { mutateAsync: createProject } = useCreateProject();

  const getProjectTypeId = (projectTypeName: string) => {
    if (!projectTypes) return;

    const projectType = projectTypes.find(
      (item) => item.name === projectTypeName
    );

    return projectType?.id;
  };

  return (
    <funnel.Render
      프로젝트타입선택={({ history }) => (
        <ProjectCreationFunnel.Container>
          <ProjectTypeSelection
            onNext={(projectType: ProjectType) =>
              history.push("모델선택", { projectType })
            }
          />
        </ProjectCreationFunnel.Container>
      )}
      모델선택={({ context, history }) => (
        <ProjectCreationFunnel.Container>
          <ProjectModelSelection
            projectType={context.projectType}
            onNext={(glbModels: Array<File>) =>
              history.push("프로젝트명입력", {
                glbModels,
              })
            }
            onPrevious={() => {
              history.back();
            }}
          />
        </ProjectCreationFunnel.Container>
      )}
      프로젝트명입력={({ context, history }) => (
        <ProjectCreationFunnel.Container>
          <ProjectRegister
            onPrevious={() => history.back()}
            onFinalize={async (projectName: string) => {
              // 1. 미디어파일 업로드
              const result = await uploadGlbModels(context.glbModels);

              // 2. GLB 모델에 아이템 생성
              const postModelResult = await postGlbModel(result);
              const projectTypeId = getProjectTypeId(context.projectType);

              if (!projectTypeId) {
                throw new Error("프로젝트 타입이 존재하지 않습니다.");
              }

              // 3. 프로젝트 생성 및 GLB 모델 연결
              const projectCreationResult = await createProject({
                projectName,
                projectTypeId,
                postedModelIds: postModelResult,
                groupName: selectedGroup?.uid ?? "",
              });

              console.log("프로젝트 생성 결과", projectCreationResult);
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
