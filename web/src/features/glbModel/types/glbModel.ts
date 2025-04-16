import { InteractionItem } from "@/features/interactionEditor/types";
import { LanguageMap } from "@/shared/types/memex";

export interface GlbModelData {
  name: LanguageMap;
  mediaPath: string;
  isDeleted: boolean;
  latitude: string;
  longitude: string;
  scale: string;
  rotation: string;
  position: string;
  interactions: string;
  visibility: boolean;
}

export interface GlbModelFormatted {
  uid: string;
  name: string;
  path: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  scale: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  position: {
    x: number;
    y: number;
    z: number;
  };
  interactions: InteractionItem[];
  visibility: boolean;
}

export type GlbModelEditable =
  Partial<GlbModelFormatted> & {
    uid: string;
    name: string;
    file: File | null;
  };
