import { ProjectFilter } from "@/entities/project/types";
import {
  Project,
  ProjectBody,
  ProjectFormatted,
} from "@/entities/project/types";
import { formatProject } from "@/entities/project/utils/formatters";
import { UpdateBody } from "@/shared/types";

const BASE_URL = () =>
  `${process.env.NEXT_URL}/projects/api`;

export const getProjectItem = async (
  projectItemUid: string
): Promise<ProjectFormatted> => {
  const res = await fetch(
    `${BASE_URL()}?projectId=${projectItemUid}`
  );
  const data: Project = await res.json();
  return formatProject(data);
};

export const createProject = async (
  projectBody: ProjectBody
) => {
  return fetch(BASE_URL(), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(projectBody),
  });
};

export const getProjects = async (
  filter: ProjectFilter
): Promise<ProjectFormatted[]> => {
  const params = new URLSearchParams();
  if (filter.groupName)
    params.set("groupName", filter.groupName);
  if (filter.templateId)
    params.set("templateId", filter.templateId);
  const res = await fetch(`${BASE_URL()}?${params}`);
  const data: Project[] = await res.json();
  return data.map(formatProject);
};

export const getProjectTypes = async () => {
  return {
    list: [
      {
        categories: [
          {
            id: 4682,
            order: 1,
            languageMap: { KO: "위치기반 AR" },
          },
          {
            id: 4683,
            order: 2,
            languageMap: { KO: "얼굴인식 AR" },
          },
          {
            id: 4684,
            order: 3,
            languageMap: { KO: "이미지마커 AR" },
          },
        ],
      },
    ],
  };
};

export const updateProject = async (body: UpdateBody) => {
  return fetch(`${BASE_URL()}?projectId=${body.uid}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
};
