import { desc, sql } from "drizzle-orm";

import { db } from "@/shared/lib/db";
import { arProjects } from "@/shared/lib/schema";

type ProjectRow = typeof arProjects.$inferSelect;

export async function findProjectsByGroup(
  groupName: string,
): Promise<ProjectRow[]> {
  return db
    .select()
    .from(arProjects)
    .where(
      sql`${arProjects.isDeleted} IS NOT TRUE
    AND ${arProjects.groupName}::text LIKE ${"%" + groupName + "%"}`,
    )
    .orderBy(desc(arProjects.createdAt));
}
