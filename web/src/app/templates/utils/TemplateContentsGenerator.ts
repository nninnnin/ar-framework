import parse, { HTMLElement } from "node-html-parser";

import { TemplateContents } from "@/app/templates/constants/templateContents";
import { ProjectType } from "@/features/project/types/project";
import { GlbModelFormatted } from "@/features/glbModel/types/glbModel";

class TemplateContentsGenerator {
  projectType: ProjectType;
  templateRoot: HTMLElement;
  glbModels: GlbModelFormatted[];

  constructor(
    projectType: ProjectType,
    htmlTemplateString: string,
    glbModels: GlbModelFormatted[]
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
    this.addMessageHandler();
    this.addArContentsLoadingHandlers(
      this.projectType
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
        const modelName = model.name;
        const modelUid = model.uid;

        const scale = model.scale
          ? `scale="${model.scale.x} ${model.scale.y} ${model.scale.z}"`
          : `scale="10 10 10"`;

        const position = model.position
          ? `position="${model.position.x} ${model.position.y} ${model.position.z}"`
          : `position="0 0 0"`;

        const rotation = model.rotation
          ? `rotation="${model.rotation.x} ${model.rotation.y} ${model.rotation.z}"`
          : `rotation="0 0 0"`;

        if (projectType === "위치기반 AR") {
          const defaultCoordinates = {
            latitude: "37.533836",
            longitude: "127.007736",
          }; // 한남동 사무실

          const latitude =
            model.coordinates.latitude ??
            defaultCoordinates.latitude;
          const longitude =
            model.coordinates.longitude ??
            defaultCoordinates.longitude;

          const coordinates = `latitude: ${latitude}; longitude: ${longitude}`;

          return `<a-entity ${scale} ${position} ${rotation} gps-projected-entity-place="${coordinates}"><a-gltf-model data-model-name="${modelName}" src="#${modelUid}" scale="1 1 1" animation-mixer frustum-culled></a-gltf-model></a-entity>`;
        }

        if (projectType === "얼굴인식 AR") {
          return `<a-entity ${scale} ${position} ${rotation} mindar-face-target="anchorIndex: 168"><a-gltf-model data-model-name="${modelName}" src="#${modelUid}" scale="1 1 1" animation-mixer frustum-culled></a-gltf-model></a-entity>`;
        }

        return `
          <a-entity ${scale} ${position} ${rotation}>
            <a-gltf-model data-model-name="${modelName}" src="#${modelUid}" scale="1 1 1" animation-mixer frustum-culled></a-gltf-model>
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
      `<script src="/scripts/aframeComponents/frustumCulled.js"></script>`
    );
    this.appendToHead(
      `<link rel="stylesheet" href="/styles/controls.css" />`
    );
  }

  addMessageHandler() {
    this.appendToBody(
      `<script src="/scripts/message.js"></script>`
    );

    this.appendToBody(
      `<script>
        addMessageHandler({
          "show-glb-models": () => {
            const hideAllModels = () => {
              const models = document.querySelectorAll("a-gltf-model");

              if (!models || !models.length) {
                throw Error("No Glb Models on AR Contents!");
              }

              models.forEach((model) => {
                model.setAttribute("visible", true);
              });
            }

            hideAllModels();
          },
          "show-capture-button": () => {
            const captureButton = document.getElementById("capture-button");

            if (!captureButton) {
              throw Error("Capture Button not found!");
            }

            const enableCaptureButton = () => {
              captureButton.style.setProperty('visibility', 'visible');
              captureButton.style.setProperty('pointer-events', 'initial');
            };

            enableCaptureButton();
          }
        })
      </script>`
    );
  }

  addArContentsLoadingHandlers(arType: ProjectType) {
    this.appendToBody(
      `<script src="/scripts/arLoaded.js"></script>`
    );

    if (arType === "위치기반 AR") {
      this.appendToBody(
        `<script>
          addARLoadedHandler("location", () => {
            postMessageToParent({
              type: "ar-loaded"
            })
          })
        </script>`
      );
    }

    if (arType === "얼굴인식 AR") {
      this.appendToBody(
        `<script>
          addARLoadedHandler("face", () => {
            postMessageToParent({
              type: "ar-loaded"
            })
          })
        </script>`
      );
    }

    if (arType === "이미지마커 AR") {
      this.appendToBody(
        `<script>
          addARLoadedHandler("marker", () => {
            postMessageToParent({
              type: "ar-loaded"
            })
          })
        </script>`
      );
    }
  }
}

export default TemplateContentsGenerator;
