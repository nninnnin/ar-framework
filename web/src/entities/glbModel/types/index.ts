import {
  LanguageMap,
  MemexItemResult,
  MemexListResult,
} from "@/shared/types/memex";

export interface GlbModelItem {
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

export interface GlbModelItemFormatted {
  uid: string;
  name: string;
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

export type GlbModelListResult =
  MemexListResult<GlbModelItem>;

export type GlbModelItemResult =
  MemexItemResult<GlbModelItem>;
