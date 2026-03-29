export type { GlbModel } from "@/entities/glbModel/schema";

export interface GlbModelItemFormatted {
  uid: string;
  name: string | null;
  mediaPath: string | null;
  isDeleted: boolean | null;
  latitude: string | null;
  longitude: string | null;
  scale: string | null;
  rotation: string | null;
  position: string | null;
  interactions: string | null;
  visibility: boolean | null;
}
