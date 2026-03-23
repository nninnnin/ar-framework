import { sql } from "drizzle-orm";

import { db } from "@/shared/lib/db";
import { arProjects } from "@/shared/lib/schema";

export async function findProjectsByGroup(
  groupName: string,
) {
  return db
    .select()
    .from(arProjects)
    .where(
      sql`${arProjects.isDeleted} IS NOT TRUE
    AND ${arProjects.groupName}::text LIKE ${"%" + groupName + "%"}`,
    );
}
