import {
  LanguageMap,
  MemexItemResult,
  MemexListResult,
} from "@/shared/types/memex";

export interface GlbModelItem {
  name: LanguageMap;
  mediaPath: string;
  isDeleted: boolean;
}

export interface GlbModelItemFormatted {
  uid: string;
  name: string;
  mediaPath: string;
  isDeleted: boolean;
}

export type GlbModelListResult =
  MemexListResult<GlbModelItem>;

export type GlbModelItemResult =
  MemexItemResult<GlbModelItem>;
