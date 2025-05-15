import {
  createMemexFetcher,
  pipe,
} from "@rebel9/memex-fetcher";

import {
  GlbModelData,
  GlbModelFormatted,
} from "@/features/glbModel/types/glbModel";
import {
  MemexListResult,
  MemexModelItem,
} from "@/shared/types/memex";

const memexFetcher = createMemexFetcher(
  process.env.MEMEX_TOKEN ?? ""
);

export const getGlbModels = async (
  glbModelUids?: string[]
): Promise<GlbModelFormatted[]> => {
  const res = await memexFetcher.getList(
    process.env.MEMEX_PROJECT_ID ?? "",
    "glbModels",
    {
      page: 0,
      size: 1000,
      // TODO: searchConds 사용으로 uid로 검색하도록 수정
      // @ts-ignore
      // ...(glbModelUids
      //   ? { uids: [...glbModelUids] }
      //   : {}),
    }
  );

  const result =
    (await res.json()) as MemexListResult<GlbModelData>;

  return pipe(
    result.list,
    filterDeletedModels,
    (items: MemexModelItem<GlbModelData>[]) =>
      glbModelUids
        ? filterWithIds(items, glbModelUids)
        : items,
    formatGlbModelItems
  );
};

const filterDeletedModels = (
  items: MemexModelItem<GlbModelData>[]
) => {
  return items.filter((item) => !item.data.isDeleted);
};

const filterWithIds = (
  items: MemexModelItem<GlbModelData>[],
  ids: string[]
) => {
  return items.filter((item) =>
    ids.includes(item.uid)
  );
};

const formatGlbModelInteractions = (
  interactionsRaw: string
) => {
  try {
    if (!interactionsRaw) {
      return interactionsRaw;
    }

    const parsed = JSON.parse(interactionsRaw);

    return parsed;
  } catch (error) {
    throw new Error(
      `Failed to parse interactions: ${error}`
    );
  }
};

const formatGlbModelItems = (
  items: MemexModelItem<GlbModelData>[]
) => {
  const formatted = items.map(({ uid, data }) => {
    return {
      uid: uid,
      name: data.name.KO,
      path: data.mediaPath,
      coordinates: {
        latitude: data.latitude ? data.latitude : null,
        longitude: data.longitude
          ? data.longitude
          : null,
      },
      scale: data.scale
        ? JSON.parse(data.scale)
        : { x: 0, y: 0, z: 0 },
      rotation: data.rotation
        ? JSON.parse(data.rotation)
        : { x: 0, y: 0, z: 0 },
      position: data.position
        ? JSON.parse(data.position)
        : { x: 0, y: 0, z: 0 },
      interactions: formatGlbModelInteractions(
        data.interactions
      ),
      visibility: data.visibility,
    };
  });

  return formatted;
};
