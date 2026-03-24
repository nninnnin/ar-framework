export interface GlbModelItem {
  name: { KO?: string };
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

export type GlbModelListResult = {
  list: { uid: string; data: GlbModelItem }[];
};

export type GlbModelItemResult = {
  uid: string;
  data: GlbModelItem;
};
