import { db } from "@/shared/lib/db";
import { glbModels } from "@/shared/lib/schema";

type GlbModelInsert = typeof glbModels.$inferInsert;

export async function createGlbModel(values: GlbModelInsert): Promise<void> {
  await db.insert(glbModels).values(values);
}
