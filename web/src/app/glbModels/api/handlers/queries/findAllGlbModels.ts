import { eq } from "drizzle-orm";

import { db } from "@/shared/lib/db";
import { glbModels } from "@/shared/lib/schema";

type GlbModelRow = typeof glbModels.$inferSelect;

export async function findAllGlbModels(): Promise<GlbModelRow[]> {
  return db
    .select()
    .from(glbModels)
    .where(eq(glbModels.isDeleted, false));
}
