import { TestSuite } from "@/shared/types/test";
import { getProjects } from "@/entities/project/tests/getProjects";
import { createProject } from "@/entities/project/tests/createProject";
import { removeProject } from "@/entities/project/tests/removeProject";

const projectTestSuite: TestSuite = [
  getProjects,
  createProject,
  removeProject,
];

export default projectTestSuite;
