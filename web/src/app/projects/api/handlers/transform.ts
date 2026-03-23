import { resolveGlbModelRelations, resolveGroupRelations } from "./queries/index";

const str = (v: unknown): string => (v as string) ?? "";
const bool = (v: unknown): boolean => v === "true" || v === true;
const arr = (v: unknown): unknown[] => (v as unknown[]) ?? [];

const PROJECT_TYPE_MAP: Record<number, object> = {
  4682: { _id: 4682, order: 1, languageMap: { KO: "위치기반 AR" } },
  4683: { _id: 4683, order: 2, languageMap: { KO: "얼굴인식 AR" } },
  4684: { _id: 4684, order: 3, languageMap: { KO: "이미지마커 AR" } },
};

export async function toProjectValues(data: Record<string, unknown>) {
  const [resolvedGlbModels, resolvedGroupName] = await Promise.all([
    resolveGlbModelRelations(arr(data.glbModels) as string[]),
    resolveGroupRelations(arr(data.groupName) as string[]),
  ]);

  const projectType = (arr(data.projectType) as number[]).map(
    (id) => PROJECT_TYPE_MAP[id] ?? { _id: id, order: 1, languageMap: { KO: "" } }
  );

  return {
    name: data.name,
    projectType,
    glbModels: resolvedGlbModels,
    groupName: resolvedGroupName,
    isLocked: bool(data.isLocked),
    templateId: str(data.templateId),
    imageTarget: arr(data.imageTarget),
  };
}
