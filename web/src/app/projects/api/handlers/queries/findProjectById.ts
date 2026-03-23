import { eq } from "drizzle-orm";

import { db } from "@/shared/lib/db";
import { arProjects } from "@/shared/lib/schema";

export async function findProjectById(uid: string) {
  const [row] = await db.select().from(arProjects).where(eq(arProjects.uid, uid));
  return row ?? null;
}
