import { LanguageMap } from "@/shared/types/memex";

export interface GlbModelData {
  name: LanguageMap;
  mediaPath: string;
  isDeleted: boolean;
  latitude: string;
  longitude: string;
}

export interface GlbModelFormatted {
  uid: string;
  name: string;
  path: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
}
