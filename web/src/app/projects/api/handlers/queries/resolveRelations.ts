import { inArray } from "drizzle-orm";

import { db } from "@/shared/lib/db";
import {
  glbModels,
  projectGroups,
  type RelationEntry,
} from "@/shared/lib/schema";

export async function resolveGlbModelRelations(
  uids: string[],
): Promise<RelationEntry[]> {
  if (!uids?.length) return [];
  const rows = await db
    .select({
      uid: glbModels.uid,
      name: glbModels.name,
    })
    .from(glbModels)
    .where(inArray(glbModels.uid, uids));
  return rows.map((row) => ({
    uid: row.uid,
    languageMap: row.name ?? {},
  }));
}

export async function resolveGroupRelations(
  uids: string[],
): Promise<RelationEntry[]> {
  if (!uids?.length) return [];

  const rows = await db
    .select({
      uid: projectGroups.uid,
      name: projectGroups.name,
    })
    .from(projectGroups)
    .where(inArray(projectGroups.uid, uids));

  return rows.map((row) => ({
    uid: row.uid,
    languageMap: row.name ?? {},
  }));
}
