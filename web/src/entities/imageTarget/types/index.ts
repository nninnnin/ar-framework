import {
  LanguageMap,
  MemexItemResult,
  MemexListResult,
} from "@/shared/types/memex";

export interface ImageTargetItem {
  name: LanguageMap;
  path: string;
  isDeleted: boolean;
}

export interface ImageTargetFormatted {
  uid: string;
  name: string;
  path: string;
  isDeleted: boolean;
}

export type GlbModelListResult =
  MemexListResult<ImageTargetItem>;

export type GlbModelItemResult =
  MemexItemResult<ImageTargetItem>;
