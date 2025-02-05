import { ProjectType } from "@/types/project";

export type 프로젝트타입선택 = {
  projectType?: ProjectType;
  glbModels?: Array<File>;
  projectName?: string;
};

export type 모델선택 = {
  projectType: ProjectType;
  glbModels?: Array<File>;
  projectName?: string;
};

export type 프로젝트명입력 = {
  projectType: ProjectType;
  glbModels: Array<File>;
  projectName?: string;
};
