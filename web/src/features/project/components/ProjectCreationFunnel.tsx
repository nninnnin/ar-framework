"use client";

import React, { useContext } from "react";
import { useFunnel } from "@use-funnel/browser";

import { OverlayCloseContext } from "@/features/project/components/ProjectSection";
import {
  모델선택,
  프로젝트명입력,
  프로젝트타입선택,
} from "@/features/project/types/projectCreationFunnel";
import { useSelectedGroup } from "@/features/group/hooks/useSelectedGroup";
import useResetProjectFunnelStates from "@/features/project/hooks/useResetProjectFunnelStates";
import { useAddedModels } from "@/features/project/store";
import usePostGlbModel from "@/features/glbModel/hooks/usePostGlbModel";
import useProjectTypes from "@/features/project/hooks/useProjectTypes";
import useCreateProject from "@/features/project/hooks/useCreateProject";
import ProjectTypeSelectionDialog from "@/features/project/components/ProjectTypeSelectionDialog";
import { ProjectType } from "@/features/project/types/project";
import ProjectModelSelectionDialog from "@/features/project/components/ProjectModelSelectionDialog";
import ProjectRegisterDialog from "@/features/project/components/ProjectRegisterDialog";
import { getProjectTypeId } from "@/features/project/utils";
import { createProjectBody } from "@/entities/project/utils";
import { uploadGlbModels } from "@/entities/glbModel/utils/fetchers";

const ProjectCreationFunnel = () => {
  const { close: closeOverlay } = useContext(
    OverlayCloseContext
  );

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
  const { resetProjectFunnelStates } =
    useResetProjectFunnelStates();

  const { addedModels } = useAddedModels();
  const { mutateAsync: postGlbModel } =
    usePostGlbModel();
  const { data: projectTypes } = useProjectTypes();
  const { mutateAsync: createProject } =
    useCreateProject();

  const handleClose = () => {
    resetProjectFunnelStates();
    closeOverlay && closeOverlay();
  };

  return (
    <funnel.Render
      프로젝트타입선택={({ history }) => (
        <ProjectTypeSelectionDialog
          onClose={handleClose}
          onNext={(projectType: ProjectType) =>
            history.push("모델선택", { projectType })
          }
        />
      )}
      모델선택={({ history }) => (
        <ProjectModelSelectionDialog
          onClose={handleClose}
          onPrevious={() => history.back()}
          onNext={() =>
            history.push("프로젝트명입력", {
              glbModels: addedModels
                .filter((m) => m)
                .map((m) => m!.file),
            })
          }
          headerLabel="모델 선택"
        />
      )}
      프로젝트명입력={({ context, history }) => (
        <ProjectRegisterDialog
          onClose={handleClose}
          onPrevious={() => history.back()}
          onFinalize={async (projectName: string) => {
            // 1. 미디어파일 업로드
            const result = await uploadGlbModels(
              context.glbModels
            );

            // 2. GLB 모델에 아이템 생성
            const postModelResult = await postGlbModel(
              result
            );
            const projectTypeId = getProjectTypeId(
              context.projectType,
              projectTypes
            );

            if (!projectTypeId) {
              throw new Error(
                "프로젝트 타입이 존재하지 않습니다."
              );
            }

            // 3. 프로젝트 생성 및 GLB 모델 연결
            const projectBody = createProjectBody(
              projectName,
              projectTypeId,
              postModelResult,
              selectedGroup?.uid ?? ""
            );

            const projectCreationResult =
              await createProject(projectBody);

            console.log(
              "프로젝트 생성 결과",
              projectCreationResult
            );

            closeOverlay && closeOverlay();
          }}
        />
      )}
    />
  );
};

export default ProjectCreationFunnel;
