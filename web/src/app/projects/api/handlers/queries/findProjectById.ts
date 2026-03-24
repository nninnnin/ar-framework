import { eq } from "drizzle-orm";

import { db } from "@/shared/lib/db";
import { arProjects } from "@/shared/lib/schema";

type ProjectRow = typeof arProjects.$inferSelect;

export async function findProjectById(uid: string): Promise<ProjectRow | null> {
  const [row] = await db.select().from(arProjects).where(eq(arProjects.uid, uid));
  return row ?? null;
}
