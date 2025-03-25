import { createMemexFetcher } from "@rebel9/memex-fetcher";

import {
  GlbModelData,
  GlbModelFormatted,
} from "@/features/glbModel/types/glbModel";

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

  const result = await res.json();

  return result.list
    .filter((glbModel: { uid: string }) =>
      (glbModelUids ?? []).includes(glbModel.uid)
    )
    .map(
      (model: { uid: string; data: GlbModelData }) => {
        console.log("HI", model);

        return {
          uid: model.uid,
          name: model.data.name.KO,
          path: model.data.mediaPath,
          coordinates: {
            latitude: model.data.latitude
              ? model.data.latitude
              : null,
            longitude: model.data.longitude
              ? model.data.longitude
              : null,
          },
          scale: model.data.scale
            ? JSON.parse(model.data.scale)
            : { x: 0, y: 0, z: 0 },
          rotation: model.data.rotation
            ? JSON.parse(model.data.rotation)
            : { x: 0, y: 0, z: 0 },
          position: model.data.position
            ? JSON.parse(model.data.position)
            : { x: 0, y: 0, z: 0 },
        };
      }
    );
};
