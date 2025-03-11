import { TestSuite } from "@/shared/types/test";
import { getProjects } from "@/entities/project/test/getProjects";
import { createProject } from "@/entities/project/test/createProject";
import { removeProject } from "@/entities/project/test/removeProject";

const projectTestSuite: TestSuite = [
  getProjects,
  createProject,
  removeProject,
];

export default projectTestSuite;
