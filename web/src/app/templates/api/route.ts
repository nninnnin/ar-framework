import { Project } from "@/types/project";
import { formatProjectItem } from "@/utils/formatters";
import { getProjectItem } from "@/utils/fetchers/project";
import { generateArTemplate } from "@/app/templates/utils";

export async function GET(request: Request) {
  // 1. 프로젝트 아이디로 미믹스에서 프로젝트 정보 가져오기
  const urlObj = new URL(request.url);
  const projectUid =
    urlObj.searchParams.get("projectUid");

  if (!projectUid) {
    return new Response("projectUid is required", {
      status: 400,
    });
  }

  const projectItemUnformatted: Project =
    await getProjectItem(projectUid);
  const projectItemFormatted = formatProjectItem(
    projectItemUnformatted
  );

  // 2. 가져온 프로젝트 정보 기반으로 템플릿 생성
  const templateFile = await generateArTemplate(
    projectItemFormatted
  );

  const response = new Response(templateFile);
  response.headers.set(
    "Content-Type",
    "text/html; charset=utf-8"
  );

  return response;
}
