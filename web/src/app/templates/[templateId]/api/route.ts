import { generateArTemplate } from "@/app/templates/utils";
import { getProjects } from "@/entities/project/utils/fetchers";

import { formatProjectList } from "@/entities/project/utils/formatters";
import { ProjectFormatted } from "@/features/project/types/project";
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

  const templateResponse = await getProjects({
    templateId,
  });

  const templateResult = await templateResponse.json();

  if (templateResult.list.length === 0) {
    return new Response(
      `Template not found with id: ${templateId}`,
      {
        status: 404,
      }
    );
  }

  const templateData = formatProjectList(
    templateResult
  )[0] as ProjectFormatted;

  console.log(templateData);

  const hasControls =
    getSearchParam(request, "glbControls") === "1"
      ? true
      : false;

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
