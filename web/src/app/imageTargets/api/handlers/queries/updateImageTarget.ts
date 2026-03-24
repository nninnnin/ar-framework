import { eq } from "drizzle-orm";
import { db } from "@/shared/lib/db";
import { imageTargets } from "@/shared/lib/schema";

type ImageTargetInsert = typeof imageTargets.$inferInsert;

export async function updateImageTarget(uid: string, values: Partial<ImageTargetInsert>): Promise<void> {
  await db.update(imageTargets).set(values).where(eq(imageTargets.uid, uid));
}
