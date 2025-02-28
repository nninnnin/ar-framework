import { generateArTemplate } from "@/app/templates/utils";
import { ProjectFormatted } from "@/features/project/types/project";
import createNextApiFetcher from "@/shared/utils/nextApiFetcher";

const apiFetcher = createNextApiFetcher({
  entity: "project",
});

export async function GET(request: Request) {
  const urlObj = new URL(request.url);
  const projectId =
    urlObj.searchParams.get("projectUid");

  if (!projectId) {
    return new Response("projectId is required", {
      status: 400,
    });
  }

  const { data: projectItem } =
    await apiFetcher.getItem<ProjectFormatted>(
      projectId
    );

  const templateFile = await generateArTemplate(
    projectItem
  );

  const response = new Response(templateFile);
  response.headers.set(
    "Content-Type",
    "text/html; charset=utf-8"
  );

  return response;
}
