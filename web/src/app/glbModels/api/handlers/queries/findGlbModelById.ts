import { eq } from "drizzle-orm";

import { db } from "@/shared/lib/db";
import { glbModels } from "@/shared/lib/schema";

export async function findGlbModelById(uid: string) {
  const [row] = await db.select().from(glbModels).where(eq(glbModels.uid, uid));
  return row ?? null;
}
