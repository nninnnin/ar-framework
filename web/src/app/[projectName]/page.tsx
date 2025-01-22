import { Params } from "next/dist/server/request/params";
import React from "react";

const ProjectPage = async ({ params }: { params: Params }) => {
  const { projectName } = await params;

  console.log(projectName);

  return <iframe src={"http://localhost:3000/templates/api"}></iframe>;
};

export default ProjectPage;
