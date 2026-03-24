import { generateArTemplate } from "@/app/templates/utils";
import { findProjectByTemplateId } from "@/app/projects/api/handlers/queries";
import { projectSchema } from "@/entities/project/schema";
import { formatProject } from "@/entities/project/utils/formatters";
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

  const row = await findProjectByTemplateId(templateId);
  if (!row) {
    return new Response("Not found", { status: 404 });
  }

  const projectFormatted = formatProject(projectSchema.parse(row));

  const hasControls =
    getSearchParam(request, "glbControls") === "1";

  const templateFile = await generateArTemplate(
    projectFormatted,
    { hasControls }
  );

  const response = new Response(templateFile);
  response.headers.set(
    "Content-Type",
    "text/html; charset=utf-8"
  );

  return response;
}
