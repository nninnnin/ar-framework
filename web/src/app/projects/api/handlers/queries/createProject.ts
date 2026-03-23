import { db } from "@/shared/lib/db";
import { arProjects } from "@/shared/lib/schema";

type ProjectInsert = typeof arProjects.$inferInsert;

export async function createProject(values: ProjectInsert): Promise<void> {
  await db.insert(arProjects).values(values);
}
