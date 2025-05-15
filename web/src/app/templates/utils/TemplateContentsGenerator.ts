import parse, { HTMLElement } from "node-html-parser";

import { TemplateContents } from "@/app/templates/constants/templateContents";
import { ProjectType } from "@/features/project/types/project";
import { GlbModelFormatted } from "@/features/glbModel/types/glbModel";

class TemplateContentsGenerator {
  projectType: ProjectType;
  templateRoot: HTMLElement;
  glbModels: GlbModelFormatted[];
  targetImagePath: string | null;

  constructor(
    projectType: ProjectType,
    htmlTemplateString: string,
    glbModels: GlbModelFormatted[],
    targetImagePath: string | null
  ) {
    this.projectType = projectType;
    this.templateRoot = parse(htmlTemplateString);
    this.glbModels = glbModels;
    this.targetImagePath = targetImagePath;
  }

  generateTemplate({
    hasControls,
  }: {
    hasControls: boolean;
  }) {
    // Construct HTML tags
    this.appendToHead(this.getCommonHeadScripts());
    this.appendToHead(this.getHeadScripts());
    this.appendToBody(this.getBodyContents());
    this.appendToScene(
      this.generateGlbModelAssets(this.projectType)
    );
    this.appendToScene(
      this.generateGlbModelElements(this.projectType)
    );

    // Add scripts
    if (hasControls) this.addControls();

    this.addCapturer();
    this.addMessageHandler();
    this.addArContentsLoadingHandlers(
      this.projectType
    );

    this.addToneResetter(this.projectType);
    this.addScreenshotFixComponent();
    this.addFrustumCulled();

    return this.templateRoot.toString();
  }

  getCommonHeadScripts() {
    return TemplateContents.common.headScripts;
  }

  getHeadScripts() {
    return TemplateContents[this.projectType]
      .headScripts;
  }

  getBodyContents() {
    const bodyContents =
      TemplateContents[this.projectType].bodyContents;

    if (this.targetImagePath) {
      return bodyContents.replaceAll(
        "#imageTarget",
        this.targetImagePath
      );
    }

    return bodyContents;
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
    const headOccluderAsset = `<a-asset-item id="headModel" src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.2.5/examples/face-tracking/assets/sparkar/headOccluder.glb"></a-asset-item>`;

    const modelAssets = this.glbModels.map((model) => {
      return `
        <a-asset-item id=${model.uid} src=${model.path}>
        </a-asset-item>
      `;
    });

    return `
      <a-assets>
        ${
          projectType === "얼굴인식 AR"
            ? `${headOccluderAsset}`
            : ""
        }

        ${modelAssets}
      </a-assets>
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

        const visibility = model.visibility ?? true;

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

          return `<a-entity gps-projected-entity-place="${coordinates}"><a-gltf-model data-model-name="${modelName}" src="#${modelUid}" ${scale} ${rotation} ${position} visible="${visibility}" animation-mixer frustum-culled gltf-tone-mapped></a-gltf-model></a-entity>`;
        }

        if (projectType === "얼굴인식 AR") {
          return `<a-entity mindar-face-target="anchorIndex: 168"><a-gltf-model data-model-name="${modelName}" src="#${modelUid}" ${scale} ${position} ${rotation} visible="${visibility}" animation-mixer frustum-culled gltf-tone-mapped></a-gltf-model></a-entity>`;
        }

        if (projectType === "이미지마커 AR") {
          return `<a-entity id="imageTarget" mindar-image-target="targetIndex: 0">
            <a-gltf-model src="#${modelUid}" ${scale} ${position} ${rotation} animation-mixer></a-gltf-model>
          </a-entity>`;
        }

        return `
          <a-entity>
            <a-gltf-model data-model-name="${modelName}" src="#${modelUid}" ${scale} ${position} ${rotation} animation-mixer frustum-culled gltf-tone-mapped></a-gltf-model>
          </a-entity>
        `;
      })
      .join("");
  }

  addControls() {
    this.appendToHead(
      `<link rel="stylesheet" href="/features/controls/index.css" />`
    );

    this.appendToBody(
      `<script src="/features/controls/index.js"></script>`
    );
  }

  addFrustumCulled() {
    this.appendToHead(
      `<script src="/scripts/aframeComponents/frustumCulled.js"></script>`
    );
  }

  addCapturer() {
    this.appendToHead(
      `<link rel="stylesheet" href="/features/capturer/index.css" />`
    );
    this.appendToBody(
      `<script src="/features/capturer/index.js"></script>`
    );
  }

  addToneResetter(projectType: ProjectType) {
    if (projectType === "위치기반 AR") {
      this.appendToBody(
        `<script src="/scripts/toneReset.js"></script>`
      );
    }
  }

  addScreenshotFixComponent() {
    this.appendToHead(
      `<script src="/scripts/aframeComponents/screenshotFixed.js"></script>`
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
            const showAllModels = () => {
              const models = document.querySelectorAll("a-gltf-model");

              if (!models || !models.length) {
                throw Error("No Glb Models on AR Contents!");
              }

              models.forEach((model) => {
                model.setAttribute("visible", true);
              });
            }

            showAllModels();
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
