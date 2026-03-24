import { z } from "zod";

import { glbModelSchema } from "@/entities/glbModel/schema";

const BASE_URL = () => `${process.env.NEXT_URL}/glbModels/api`;

const vec3 = z.string().nullable().transform((v) =>
  v ? JSON.parse(v) : { x: 0, y: 0, z: 0 }
);

const glbModelFormattedSchema = glbModelSchema.transform((row) => ({
  uid: row.uid,
  name: row.name?.KO ?? "",
  path: row.mediaPath ?? "",
  isDeleted: row.isDeleted,
  coordinates: {
    latitude: row.latitude ?? "",
    longitude: row.longitude ?? "",
  },
  scale: vec3.parse(row.scale),
  rotation: vec3.parse(row.rotation),
  position: vec3.parse(row.position),
  interactions: row.interactions ? JSON.parse(row.interactions) : [],
  visibility: row.visibility ?? true,
}));

export const getGlbModels = async (glbModelUids?: string[]) => {
  const res = await fetch(BASE_URL());
  const rows = z.array(glbModelFormattedSchema).parse(await res.json());
  return rows.filter((row) => !row.isDeleted && (!glbModelUids || glbModelUids.includes(row.uid)));
};
