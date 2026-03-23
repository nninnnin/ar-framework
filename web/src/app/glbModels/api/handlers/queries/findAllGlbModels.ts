import { eq } from "drizzle-orm";

import { db } from "@/shared/lib/db";
import { glbModels } from "@/shared/lib/schema";

export async function findAllGlbModels() {
  return db
    .select()
    .from(glbModels)
    .where(eq(glbModels.isDeleted, false));
}
