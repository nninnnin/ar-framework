export type { ImageTarget } from "@/entities/imageTarget/schema";

export interface ImageTargetFormatted {
  uid: string;
  name: string;
  path: string;
  isDeleted: boolean;
}
