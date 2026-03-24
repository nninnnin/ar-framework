import { asc } from "drizzle-orm";

import { db } from "@/shared/lib/db";
import { projectGroups } from "@/shared/lib/schema";

export async function findAllGroups() {
  return db.select().from(projectGroups).orderBy(asc(projectGroups.createdAt));
}
