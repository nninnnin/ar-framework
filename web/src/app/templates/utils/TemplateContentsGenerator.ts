import parse, { HTMLElement } from "node-html-parser";

import { TemplateContents } from "@/app/templates/constants/templateContents";
import { ProjectType } from "@/types/project";

class TemplateContentsGenerator {
  projectType: ProjectType;
  templateRoot: HTMLElement;
  glbModels: {
    uid: string;
    name: string;
    path: string;
  }[];

  constructor(
    projectType: ProjectType,
    htmlTemplateString: string,
    glbModels: {
      uid: string;
      name: string;
      path: string;
    }[]
  ) {
    this.projectType = projectType;
    this.templateRoot = parse(htmlTemplateString);
    this.glbModels = glbModels;
  }

  generateTemplate() {
    this.appendToHead(this.getHeadScripts());

    this.appendToBody(this.getBodyContents());

    this.appendToScene(
      this.generateGlbModelAssets(this.projectType)
    );
    this.appendToScene(
      this.generateGlbModelElements(this.projectType)
    );

    return this.templateRoot.toString();
  }

  getHeadScripts() {
    return TemplateContents[this.projectType]
      .headScripts;
  }

  getBodyContents() {
    return TemplateContents[this.projectType]
      .bodyContents;
  }

  appendToHead(contents: string) {
    const head =
      this.templateRoot.querySelector("head");

    if (!head) {
      throw new Error(
        "Template Generator error: No head tag found"
      );
    }

    head.appendChild(parse(contents));
  }

  appendToBody(contents: string) {
    const body =
      this.templateRoot.querySelector("body");

    if (!body) {
      throw new Error(
        "Template Generator error: No body tag found"
      );
    }

    body.appendChild(parse(contents));
  }

  appendToScene(contents: string) {
    const scene =
      this.templateRoot.querySelector("a-scene");

    if (!scene) {
      throw new Error(
        "Template Generator error: No a-scene tag found"
      );
    }

    scene.appendChild(parse(contents));
  }

  generateGlbModelAssets(projectType: ProjectType) {
    const assets = this.glbModels.map((model) => {
      return `
        <a-asset-item id=${model.name} src=${model.path}>
        </a-asset-item>
      `;
    });

    return `
      <a-assets>
        ${
          projectType === "얼굴인식 AR"
            ? `<a-asset-item id="headModel" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/face-tracking/assets/sparkar/headOccluder.glb"></a-asset-item>`
            : ""
        }

        ${assets}
      </a-assets>

      ${
        projectType === "얼굴인식 AR"
          ? `<a-camera look-controls="enabled: false" position="0 0 0"></a-camera>`
          : ""
      }

      ${
        projectType === "얼굴인식 AR"
          ? `<a-entity mindar-face-target="anchorIndex: 168">
          <a-gltf-model mindar-face-occluder position="0 0 0" rotation="0 0 0" scale="1 1 1" src="#headModel"></a-gltf-model>
        </a-entity>`
          : ""
      }
    `;
  }

  generateGlbModelElements(projectType: ProjectType) {
    console.log("glb Models: ", this.glbModels);

    return this.glbModels
      .map((model) => {
        return `
          <a-entity ${
            projectType === "얼굴인식 AR"
              ? `mindar-face-target="anchorIndex: 168"`
              : ""
          }>
            <a-gltf-model src="#${
              model.uid
            }" scale="1 1 1" position="0 0 0" rotation="0 -0 0"></a-gltf-model>
          </a-entity>
        `;
      })
      .join("");
  }
}

export default TemplateContentsGenerator;
