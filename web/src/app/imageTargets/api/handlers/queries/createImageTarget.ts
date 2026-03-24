import { db } from "@/shared/lib/db";
import { imageTargets } from "@/shared/lib/schema";

type ImageTargetInsert = typeof imageTargets.$inferInsert;

export async function createImageTarget(values: ImageTargetInsert): Promise<void> {
  await db.insert(imageTargets).values(values);
}
