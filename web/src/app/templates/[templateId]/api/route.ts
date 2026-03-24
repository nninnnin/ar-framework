// TODO: 5-2 템플릿 데이터 Neon 마이그레이션 필요
// - templateId 검색을 Neon 핸들러에서 처리하도록 추가
// - templates/utils/fetchers/glbModels.ts, targetImage.ts Neon으로 교체
import { generateArTemplate } from "@/app/templates/utils";
import { ProjectFormatted } from "@/entities/project/types";
import { getSearchParam } from "@/features/project/utils";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ templateId: string }>;
  }
) {
  const { templateId } = await params;

  if (!templateId) {
    return new Response("templateId is required", {
      status: 400,
    });
  }

  // TODO: templateId로 Neon에서 프로젝트 조회
  const templateData = null as unknown as ProjectFormatted;

  const hasControls =
    getSearchParam(request, "glbControls") === "1";

  const templateFile = await generateArTemplate(
    templateData,
    { hasControls }
  );

  const response = new Response(templateFile);
  response.headers.set(
    "Content-Type",
    "text/html; charset=utf-8"
  );

  return response;
}
