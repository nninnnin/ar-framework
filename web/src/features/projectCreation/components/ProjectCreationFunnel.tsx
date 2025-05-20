"use client";

import React, { useContext } from "react";
import { useFunnel } from "@use-funnel/browser";

import { OverlayCloseContext } from "@/features/project/components/ProjectSection";
import {
  모델선택,
  프로젝트명입력,
  프로젝트타입선택,
  마커입력,
} from "@/features/projectCreation/types/projectCreationFunnel";
import { useSelectedGroup } from "@/features/group/hooks/useSelectedGroup";
import useResetProjectFunnelStates from "@/features/projectCreation/hooks/useResetProjectFunnelStates";
import usePostGlbModel from "@/features/glbModel/hooks/usePostGlbModel";
import useProjectTypes from "@/features/project/hooks/useProjectTypes";
import useCreateProject from "@/features/projectCreation/hooks/useCreateProject";
import ProjectTypeSelectionDialog from "@/features/projectCreation/components/funnelSteps/projectTypeSelection/Dialog";
import { ProjectType } from "@/features/project/types/project";
import ProjectModelSelectionDialog from "@/features/projectCreation/components/funnelSteps/ProjectModelSelectionDialog";
import ProjectRegisterDialog from "@/features/projectCreation/components/funnelSteps/ProjectRegisterDialog";
import { getProjectTypeId } from "@/features/project/utils";
import { createProjectBody } from "@/entities/project/utils";
import { uploadGlbModels } from "@/entities/glbModel/utils/fetchers";
import { useEditableGlbModels } from "@/features/glbModel/store/editableGlbModels";
import MarkerRegisterDialog from "@/features/projectCreation/components/funnelSteps/markerRegister/Dialog";
import { uploadImageTargetFile } from "@/features/projectCreation/utils/imageTarget/uploadImageTargetFile";
import { postImageTarget } from "@/features/projectCreation/utils/imageTarget/postImageTarget";

type CreationFunnelSteps = {
  프로젝트타입선택: 프로젝트타입선택;
  마커입력: 마커입력;
  모델선택: 모델선택;
  프로젝트명입력: 프로젝트명입력;
};

const ProjectCreationFunnel = () => {
  const { close: closeOverlay } = useContext(
    OverlayCloseContext
  );

  const funnel = useFunnel<CreationFunnelSteps>({
    id: "project-creation-funnel",
    initial: {
      step: "프로젝트타입선택",
      context: {},
    },
  });

  const { selectedGroup } = useSelectedGroup();
  const { resetProjectFunnelStates } =
    useResetProjectFunnelStates();

  const { editableGlbModels } = useEditableGlbModels();
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
          onNext={(projectType: ProjectType) => {
            if (projectType === "이미지마커 AR") {
              history.push("마커입력", {
                projectType,
              });

              return;
            }

            history.push("모델선택", { projectType });
          }}
        />
      )}
      마커입력={({ history }) => {
        return (
          <MarkerRegisterDialog
            headerLabel="마커정보 생성과 등록"
            onClose={handleClose}
            onPrevious={() => history.back()}
            onNext={(imageTargetFile: File) => {
              history.push("모델선택", {
                imageTargetFile,
              });
            }}
          />
        );
      }}
      모델선택={({ history }) => (
        <ProjectModelSelectionDialog
          onClose={handleClose}
          onPrevious={() => history.back()}
          onNext={() =>
            history.push("프로젝트명입력", {
              glbModels: editableGlbModels
                .filter((m) => m?.file)
                .map((m) => m!.file!),
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
            let postedImageTargetId = null;

            if (context.imageTargetFile) {
              const imageTargetUploadResult =
                await uploadImageTargetFile(
                  context.imageTargetFile
                );

              postedImageTargetId =
                await postImageTarget(
                  imageTargetUploadResult
                );
            }

            // 1. 미디어파일 업로드
            const result = await uploadGlbModels(
              context.glbModels
            );

            // 2. GLB 모델에 아이템 생성
            const postedModelIds = await postGlbModel(
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
            const projectBody = createProjectBody({
              projectName,
              projectTypeId,
              postedModelIds,
              groupId: selectedGroup?.uid ?? "",
              imageTargetId: postedImageTargetId,
            });

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
