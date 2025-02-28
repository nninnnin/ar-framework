import ProjectService from "@/entities/project/service";
import { getSearchParam } from "@/features/project/utils/index";

const projectService = new ProjectService();

export async function GET(request: Request) {
  const projectId = getSearchParam(
    request,
    "projectId"
  );

  if (projectId) {
    const projectItem =
      await projectService.getProject({ projectId });

    // return one project item
    return Response.json(projectItem);
  }

  const groupName = getSearchParam(
    request,
    "groupName"
  );

  if (!groupName) {
    return new Response("groupName is required", {
      status: 400,
    });
  }

  if (!groupName && !projectId) {
    return new Response("projectId is required", {
      status: 400,
    });
  }

  const projects = await projectService.getProjects({
    groupName,
  });

  // return project list
  return Response.json(projects);
}

export async function POST(request: Request) {}

export async function PUT(request: Request) {
  const projectId = getSearchParam(
    request,
    "projectId"
  );

  if (!projectId) {
    return new Response("projectId is required", {
      status: 400,
    });
  }

  const requestBody = await request.json();

  return await projectService.updateProject(
    requestBody
  );
}
