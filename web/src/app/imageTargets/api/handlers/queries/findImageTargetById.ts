import { eq } from "drizzle-orm";
import { db } from "@/shared/lib/db";
import { imageTargets } from "@/shared/lib/schema";

type ImageTargetRow = typeof imageTargets.$inferSelect;

export async function findImageTargetById(uid: string): Promise<ImageTargetRow | null> {
  const [row] = await db.select().from(imageTargets).where(eq(imageTargets.uid, uid));
  return row ?? null;
}
