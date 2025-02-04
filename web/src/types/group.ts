import { LanguageMap, RelationInterface } from "@/types/memex";

export interface GroupResult {
  list: Group[];
}

export interface Group {
  uid: string;
  order: number;
  data: {
    name: LanguageMap;
    projects: RelationInterface[];
  };
}

export type GroupFormatted = {
  uid: string;
  name: string;
  projects: string[];
};
