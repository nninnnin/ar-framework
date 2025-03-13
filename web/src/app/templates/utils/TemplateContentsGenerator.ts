import parse, { HTMLElement } from "node-html-parser";

import { TemplateContents } from "@/app/templates/constants/templateContents";
import { ProjectType } from "@/features/project/types/project";

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

    this.addControls();

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
        <a-asset-item id=${model.uid} src=${model.path}>
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
    return this.glbModels
      .map((model) => {
        return `
          <a-entity scale="10 10 10" ${
            projectType === "얼굴인식 AR"
              ? `mindar-face-target="anchorIndex: 168"`
              : projectType === "위치기반 AR"
              ? `gps-projected-entity-place="latitude: 37.533836; longitude: 127.007736"`
              : ""
          }>
            <a-gltf-model data-model-name="${
              model.name
            }" src="#${
          model.uid
        }" scale="1 1 1" position="0 0 0" rotation="0 0 0" animation-mixer frustumCulled="cull: false"></a-gltf-model>
          </a-entity>
        `;
      })
      .join("");
  }

  addControls() {
    this.appendToBody(
      `<div id='ar-controls-root'></div>`
    );
    this.appendToBody(
      `<script src="/scripts/controls.js"></script>`
    );
    this.appendToHead(
      `<script src="/scripts/aframeComponent/frustumCulled.js"></script>`
    );
    this.appendToHead(
      `<link rel="stylesheet" href="/styles/controls.css" />`
    );
  }
}

export default TemplateContentsGenerator;
