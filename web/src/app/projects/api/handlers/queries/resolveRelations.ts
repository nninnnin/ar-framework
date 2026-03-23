import { sql } from "drizzle-orm";

import { db } from "@/shared/lib/db";
import { glbModels, projectGroups } from "@/shared/lib/schema";

export async function resolveGlbModelRelations(uids: string[]) {
  if (!uids?.length) return [];
  const rows = await db
    .select({ uid: glbModels.uid, name: glbModels.name })
    .from(glbModels)
    .where(sql`${glbModels.uid} = ANY(${uids})`);
  return rows.map((row) => ({ uid: row.uid, languageMap: row.name, type: "RELATION" }));
}

export async function resolveGroupRelations(uids: string[]) {
  if (!uids?.length) return [];
  const rows = await db
    .select({ uid: projectGroups.uid, name: projectGroups.name })
    .from(projectGroups)
    .where(sql`${projectGroups.uid} = ANY(${uids})`);
  return rows.map((row) => ({ uid: row.uid, languageMap: row.name, type: "RELATION" }));
}
