import path from "path";
import { promises as fs } from "fs";
import { parse } from "node-html-parser";

import {
  ProjectFormatted,
  ProjectType,
} from "@/types/project";

export const generateArTemplate = async (
  projectItem: ProjectFormatted
) => {
  const templatePath = getTemplatePath(
    projectItem.projectType
  );

  const templateFile = await fs.readFile(
    templatePath,
    "utf-8"
  );

  return parseTemplate(templateFile);
};

const getTemplatePath = (projectType: ProjectType) => {
  const templatePathPrefix = path.resolve(
    process.cwd(),
    "src",
    "assets",
    "templates"
  );

  const templateName = (function () {
    switch (projectType) {
      case "얼굴인식 AR":
        return path.resolve(
          templatePathPrefix,
          "face-tracking.html"
        );
      case "위치기반 AR":
        return path.resolve(
          templatePathPrefix,
          "location-based.html"
        );
      case "이미지마커 AR":
        return path.resolve(
          templatePathPrefix,
          "image-tracking.html"
        );
    }
  })();

  const templatePath = path.resolve(
    templatePathPrefix,
    templateName
  );

  return templatePath;
};

export const parseTemplate = (
  templateHTMLstring: string
) => {
  const root = parse(templateHTMLstring);

  const head = root.querySelector("head");

  const newScript = parse(
    "<script>alert('Hello')</script>"
  );

  head?.appendChild(newScript);

  return root.toString();
};

export const amendTemplate = () => {};
