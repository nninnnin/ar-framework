import {
  CategoryInterface,
  LanguageMap,
  RelationInterface,
} from "@/shared/types/memex";

export interface ProjectResult {
  list: Project[];
}

export interface ProjectData {
  name: LanguageMap;
  projects: RelationInterface[];
}

export interface Project {
  uid: string;
  order: number;
  data: {
    name: LanguageMap;
    projectType: CategoryInterface[];
    glbModels: RelationInterface[];
    groupName: RelationInterface[];
  };
}

export type ProjectFormatted = {
  uid: string;
  name: string;
  projectType: {
    id: number;
    name: ProjectType;
  };
  group: {
    id: number;
    name: string;
  };
  glbModels: {
    uid: string;
    name: string;
  }[];
  imageTarget?: {
    uid: string;
    name: string;
  }[];
  isDeleted: boolean;
  templateId: string;
};

export type ProjectType =
  | "위치기반 AR"
  | "얼굴인식 AR"
  | "이미지마커 AR"
  | (string & NonNullable<unknown>);

export type ProjectBody = {
  publish: boolean;
  data: {
    name: {
      KO: string;
    };
    projectType: number[];
    glbModels: string[];
    groupName: string[];
    imageTarget: string[] | undefined;
    templateId: string;
  };
};
