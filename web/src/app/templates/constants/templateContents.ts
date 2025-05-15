import { ProjectType } from "@/features/project/types/project";

export const TemplateContents: Record<
  ProjectType,
  {
    headScripts: string;
    bodyContents: string;
  }
> = {
  common: {
    headScripts: `
      <script>
        window.alert = () => {};
      </script>
    `,
    bodyContents: ``,
  },
  "위치기반 AR": {
    headScripts: `
      <script src="https://aframe.io/releases/1.3.0/aframe.min.js">
      </script>
      <script
        type="text/javascript"
        src="https://raw.githack.com/AR-js-org/AR.js/master/three.js/build/ar-threex-location-only.js"
      ></script>
      <script
        type='text/javascript'
        src='/scripts/libs/aframe-ar.js'
      ></script>
      <script src="https://rawgit.com/donmccurdy/aframe-extras/master/dist/aframe-extras.loaders.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r152/three.min.js"></script>
    `,
    bodyContents: `
      <a-scene
        arjs="sourceType: webcam; videoTexture: true; debugUIEnabled: false; locationEnabled: true"
        renderer="antialias: false; logarithmicDepthBuffer: true; colorManagement: true"
        vr-mode-ui="enabled: false"
        gesture-detector
        screenshotfixed
      >
        <a-camera
          id="camera"
          gps-projected-camera="gpsMinDistance: 5"
          position="0 0 0"
          rotation-reader
          look-controls="touchEnabled: false; mouseEnabled: false"
        ></a-camera>
      </a-scene>
    `,
  },
  "얼굴인식 AR": {
    headScripts: `
      <script src="https://aframe.io/releases/1.5.0/aframe.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-face-aframe.prod.js"></script>
    `,
    bodyContents: `
      <a-scene
        mindar-face
        embedded
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
        reflection="directionalLight:a-light#dirlight;"
      >
      </a-scene>
    `,
  },
  "이미지마커 AR": {
    headScripts: `
      <script src="https://aframe.io/releases/1.5.0/aframe.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/mind-ar@1.2.5/dist/mindar-image-aframe.prod.js"></script>
      <script src="https://rawgit.com/donmccurdy/aframe-extras/master/dist/aframe-extras.loaders.min.js"></script>
    `,
    bodyContents: `
      <a-scene
        id="myscene"
        mindar-image="imageTargetSrc: /dragon-pond/assets/targets.mind; filterMinCF: 0.001; filterBeta: 0.1"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: false"
      ></a-scene>
    `,
  },
};
