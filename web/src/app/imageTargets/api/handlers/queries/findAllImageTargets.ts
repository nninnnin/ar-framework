import { eq } from "drizzle-orm";
import { db } from "@/shared/lib/db";
import { imageTargets } from "@/shared/lib/schema";

type ImageTargetRow = typeof imageTargets.$inferSelect;

export async function findAllImageTargets(): Promise<ImageTargetRow[]> {
  return db
    .select()
    .from(imageTargets)
    .where(eq(imageTargets.isDeleted, false));
}
