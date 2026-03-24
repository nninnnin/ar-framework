export interface ImageTargetItem {
  name: { KO?: string };
  path: string;
  isDeleted: boolean;
}

export interface ImageTargetFormatted {
  uid: string;
  name: string;
  path: string;
  isDeleted: boolean;
}

export type ImageTargetListResult = {
  list: { uid: string; data: ImageTargetItem }[];
};

export type ImageTargetItemResult = {
  uid: string;
  data: ImageTargetItem;
};
