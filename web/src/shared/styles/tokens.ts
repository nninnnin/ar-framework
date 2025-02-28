import { ProjectType } from "@/features/project/types/project";

export const designTokens: {
  colors: {
    arTypes: Record<ProjectType, string>;
  };
} = {
  colors: {
    arTypes: {
      "얼굴인식 AR": "#6ed1f9",
      "위치기반 AR": "violet",
      "이미지마커 AR": "#fff03a",
    },
  },
};
