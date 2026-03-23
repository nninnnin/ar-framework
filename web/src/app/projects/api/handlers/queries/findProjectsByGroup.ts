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
    AND EXISTS (
      SELECT 1 FROM jsonb_array_elements(${arProjects.groupName}) AS g
      WHERE g->'languageMap'->>'KO' = ${decodeURIComponent(groupName)}
    )`,
    );
}
