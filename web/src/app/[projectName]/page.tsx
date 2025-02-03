import React from "react";

import { Params } from "next/dist/server/request/params";

interface PageProps {
  params: Promise<Params>;
}

const ProjectPage = async ({ params }: PageProps) => {
  const { projectName } = await params;

  console.log("Project Name: ", projectName);

  return <iframe src={"http://localhost:3000/templates/api"}></iframe>;
};

export default ProjectPage;
