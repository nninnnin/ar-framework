import { eq } from "drizzle-orm";

import { db } from "@/shared/lib/db";
import { glbModels } from "@/shared/lib/schema";

type GlbModelInsert = typeof glbModels.$inferInsert;

export async function updateGlbModel(uid: string, values: Partial<GlbModelInsert>): Promise<void> {
  await db.update(glbModels).set(values).where(eq(glbModels.uid, uid));
}
