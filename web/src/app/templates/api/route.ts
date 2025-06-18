import { generateArTemplate } from "@/app/templates/utils";
import { ProjectFormatted } from "@/features/project/types/project";
import { getSearchParam } from "@/features/project/utils";
import createNextApiFetcher from "@/shared/utils/nextApiFetcher";

const apiFetcher = createNextApiFetcher({
  entity: "project",
});

export async function GET(request: Request) {
  const projectId = getSearchParam(
    request,
    "projectUid"
  );

  if (!projectId) {
    return new Response("projectId is required", {
      status: 400,
    });
  }

  const { data: projectItem } =
    await apiFetcher.getItem<ProjectFormatted>(
      projectId
    );

  const hasControls =
    getSearchParam(request, "glbControls") === "1"
      ? true
      : false;

  const templateFile = await generateArTemplate(
    projectItem,
    { hasControls }
  );

  const response = new Response(templateFile);
  response.headers.set(
    "Content-Type",
    "text/html; charset=utf-8"
  );

  return response;
}
