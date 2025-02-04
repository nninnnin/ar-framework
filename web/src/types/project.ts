import { LanguageMap, RelationInterface } from "@/types/memex";

export interface ProjectResult {
  list: Project[];
}

export interface Project {
  uid: string;
  order: number;
  data: {
    name: LanguageMap;
    projects: RelationInterface[];
  };
}

export type ProjectFormatted = {
  uid: string;
  name: string;
  projects: string[];
};

export type ProjectType = "위치기반 AR" | "얼굴인식 AR" | "이미지마커 AR";
