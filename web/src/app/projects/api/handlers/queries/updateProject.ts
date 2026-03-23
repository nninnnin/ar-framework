import { eq } from "drizzle-orm";

import { db } from "@/shared/lib/db";
import { arProjects } from "@/shared/lib/schema";

type ProjectInsert = typeof arProjects.$inferInsert;

export async function updateProject(
  uid: string,
  values: Partial<ProjectInsert>,
): Promise<void> {
  await db
    .update(arProjects)
    .set(values)
    .where(eq(arProjects.uid, uid));
}
