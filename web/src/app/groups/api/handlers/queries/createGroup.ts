import { db } from "@/shared/lib/db";
import { projectGroups } from "@/shared/lib/schema";

type GroupInsert = typeof projectGroups.$inferInsert;

export async function createGroup(values: GroupInsert): Promise<void> {
  await db.insert(projectGroups).values(values);
}
