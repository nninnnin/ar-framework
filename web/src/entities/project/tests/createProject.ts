import { z } from "zod";

import ProjectService from "@/entities/project/service";
import { createProjectBody } from "@/entities/project/utils";
import { getProjectTypeId } from "@/features/project/utils";
import { getProjectTypes } from "@/entities/project/utils/fetchers";
import { getGroups } from "@/features/group/fetchers/group";
import { formatGroup } from "@/features/group/hooks/useGroups";
import { formatProjectTypes } from "@/entities/project/utils/formatters";

const isString = z.string();

export const createProject = {
  name: "프로젝트 생성하기",
  code: async () => {
    const projectService = new ProjectService();

    const res = await getProjectTypes();
    const projectTypes = await res.json();

    const formatted = formatProjectTypes(projectTypes);

    const projectTypeId = await getProjectTypeId(
      "위치기반 AR",
      formatted
    );

    if (!projectTypeId) {
      throw new Error(
        "프로젝트 타입 ID를 찾을 수 없습니다."
      );
    }

    const groupRes = await getGroups();
    const groupResult = await groupRes.json();
    const groups = formatGroup(groupResult);

    const body = createProjectBody(
      "새로운 프로젝트",
      projectTypeId,
      [],
      groups[0].uid
    );

    const createRes =
      await projectService.createProject(body);

    const projectId = await createRes.text();

    console.log("createdResult", projectId);

    return projectId;
  },
  tester: (createdProjectId: string) => {
    return Boolean(isString.parse(createdProjectId));
  },
  cleanup: (createdProjectId: string) => {
    console.log("삭제합시다", createdProjectId);
  },
};
