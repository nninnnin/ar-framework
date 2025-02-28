import { ProjectType } from "@/features/project/types/project";

export interface FormattedCategory {
  id: number;
  name: ProjectType;
}

export type MediaUploadResult = {
  id: number;
  file: {
    id: number;
    name: string;
    path: string;
  };
  languageMap: {
    KO: {
      name: string;
    };
  };
  mediaType: string;
  value: string;
};
