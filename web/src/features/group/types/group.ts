import { LanguageMap } from "@/shared/types/memex";

export interface GroupResult {
  list: Group[];
}

export interface Group {
  uid: string;
  order: number;
  data: {
    name: LanguageMap;
  };
}

export type GroupFormatted = {
  uid: string;
  name: string;
};
