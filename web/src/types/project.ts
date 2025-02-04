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
