import { arProjects } from "@/shared/lib/schema";
import { Project } from "@/features/project/types/project";

type ProjectRow = typeof arProjects.$inferSelect;

export function rowToProject(row: ProjectRow): Project {
  return {
    uid: row.uid,
    order: 0,
    data: {
      name: row.name as { KO?: string },
      projectType: (row.projectType ?? []) as { _id: number; order: number; languageMap: { KO?: string } }[],
      glbModels: (row.glbModels ?? []) as { _id: number; uid: string; languageMap: { KO?: string } }[],
      groupName: (row.groupName ?? []) as { _id: number; uid: string; languageMap: { KO?: string } }[],
      isLocked: row.isLocked ?? false,
    },
  };
}
