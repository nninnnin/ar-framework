import { asc } from "drizzle-orm";

import { db } from "@/shared/lib/db";
import { projectGroups } from "@/shared/lib/schema";

export async function findAllGroups() {
  const rows = await db.select().from(projectGroups).orderBy(asc(projectGroups.createdAt));
  return rows.map((row) => ({
    uid: row.uid,
    name: (row.name as { KO?: string })?.KO ?? "",
  }));
}
