import {
  CategoryInterface,
  LanguageMap,
  RelationInterface,
} from "@/types/memex";

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
  projectType: ProjectType;
  groupName: string;
  glbModels: {
    uid: string;
    name: string;
  }[];
};

export type ProjectType =
  | "위치기반 AR"
  | "얼굴인식 AR"
  | "이미지마커 AR"
  | (string & NonNullable<unknown>);
