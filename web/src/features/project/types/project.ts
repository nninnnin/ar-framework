export interface ProjectResult {
  list: Project[];
}

export interface ProjectData {
  name: { KO?: string };
  projects: { _id: number; uid: string; languageMap: { KO?: string } }[];
}

export interface Project {
  uid: string;
  order: number;
  data: {
    name: { KO?: string };
    projectType: { _id: number; order?: number; languageMap: { KO?: string } }[];
    glbModels: { _id?: number; uid: string; languageMap: { KO?: string } }[];
    groupName: { _id?: number; uid: string; languageMap: { KO?: string } }[];
    isLocked: boolean;
  };
}

export type ProjectFormatted = {
  uid: string;
  name: string;
  projectType: {
    id: number;
    name: ProjectType;
  };
  groupName: {
    id: string;
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
  isLocked: boolean;
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
    isLocked: string;
  };
};
