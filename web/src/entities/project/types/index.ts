import { projectSchema } from "@/entities/project/schema";
import { z } from "zod";

export type Project = z.infer<typeof projectSchema>;

export interface ProjectFilter {
  groupName?: string;
  templateId?: string;
}

export type ProjectType =
  | "위치기반 AR"
  | "얼굴인식 AR"
  | "이미지마커 AR"
  | (string & NonNullable<unknown>);

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
