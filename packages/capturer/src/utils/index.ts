import * as THREE from "three";

import { CaptureMessageInterface } from "../types";

export class Capturer {
  canvas: HTMLCanvasElement;
  dpr: number;

  isCapturing: boolean = false;
  toneMappingStore: number;
  outputEncodingStore: number;

  constructor() {
    const canvas = document.createElement("canvas");

    canvas.id = "capture-canvas";

    const dpr = window.devicePixelRatio || 1;
    this.dpr = dpr;

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    this.canvas = canvas;
  }

  getScene() {
    const scene = document.querySelector("a-scene");

    if (!scene) {
      throw Error(
        "No a-scene element found in the document"
      );
    }

    return scene;
  }

  getVideo() {
    const video = document.querySelector("video");

    if (!video) {
      throw Error(
        "No video element found in the document"
      );
    }

    return video;
  }

  stopVideo(video) {
    video.pause();
  }

  stopAnimatingScene(scene) {
    scene.renderer.setAnimationLoop(null);
  }

  captureScene(
    scene,
    options = {
      preprocessor: null,
      postprocessor: null,
    }
  ) {
    this.toneMappingStore = scene.renderer.toneMapping;
    this.outputEncodingStore =
      scene.renderer.outputEncoding ||
      scene.renderer.outputColorSpace;

    const preprocessor =
      options.preprocessor ??
      ((scene) => {
        scene.renderer.toneMapping =
          THREE.NoToneMapping;

        scene.renderer.outputEncoding =
          THREE.LinearEncoding;
        scene.renderer.outputColorSpace =
          THREE.LinearEncoding;
      });

    const postprocessor =
      options.postprocessor ??
      ((scene) => {
        scene.renderer.toneMapping =
          this.toneMappingStore;

        scene.renderer.outputEncoding =
          this.outputEncodingStore;
        scene.renderer.outputColorSpace =
          this.outputEncodingStore;
      });

    preprocessor(scene);

    console.log(
      "has screenshot-fixed component?: ",
      scene.components["screenshot-fixed"]
    );

    let capturedScene;

    if (scene.components["screenshot-fixed"]) {
      capturedScene =
        scene.components["screenshot-fixed"].getCanvas(
          "perspective"
        );
    } else {
      capturedScene =
        scene.components.screenshot.getCanvas(
          "perspective"
        );
    }

    postprocessor(scene);

    return capturedScene;
  }

  drawSceneNormal(
    options = {
      reverse: false,
    }
  ) {
    const scene = this.getScene();

    const capturedScene = options.reverse
      ? this.captureScene(scene, {
          preprocessor: () => {},
          postprocessor: () => {},
        })
      : this.captureScene(scene);

    const ctx = this.canvas.getContext("2d");

    const sourceWidth = capturedScene.width;
    const sourceHeight = capturedScene.height;

    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;

    const drawHeight = this.canvas.height;
    const drawWidth =
      (drawHeight * canvasWidth) / canvasHeight;

    const drawOffsetX =
      Math.abs(drawWidth - this.canvas.width) / 2;

    ctx.drawImage(
      capturedScene,
      0,
      0,
      sourceWidth,
      sourceHeight,
      -drawOffsetX,
      0,
      drawWidth,
      drawHeight
    );
  }

  drawSceneReverse() {
    const scene = this.getScene();

    const capturedScene =
      // @ts-ignore
      scene.components.screenshot.getCanvas(
        "perspective"
      );

    const ctx = this.canvas.getContext("2d");

    const sourceWidth = capturedScene.width;
    const sourceHeight = capturedScene.height;

    const drawWidth = this.canvas.width;
    const drawHeight = this.canvas.height;

    ctx.drawImage(
      capturedScene,
      sourceWidth * 0.1,
      0,
      sourceWidth * 0.8,
      sourceHeight,
      0,
      0,
      drawWidth,
      drawHeight
    );
  }

  async drawScene(
    options = {
      reverse: false,
    }
  ) {
    if (options.reverse) {
      this.drawSceneReverse();

      return;
    }

    this.drawSceneNormal();
  }

  drawVideo(
    options = {
      reverse: false,
    }
  ) {
    if (options.reverse) {
      this.drawVideoReverse();
    } else {
      this.drawVideoNormal();
    }
  }

  drawVideoNormal() {
    const video = this.getVideo();
    const ctx = this.canvas.getContext("2d");

    const sourceWidth = video.videoWidth;
    const sourceHeight = video.videoHeight;

    const drawHeight = this.canvas.height;
    const drawWidth =
      drawHeight * (sourceWidth / sourceHeight);

    const drawOffsetX =
      Math.abs(drawWidth - this.canvas.width) / 2;

    ctx.drawImage(
      video,
      0,
      0,
      sourceWidth,
      sourceHeight,
      -drawOffsetX,
      0,
      drawWidth,
      drawHeight
    );
  }

  drawVideoReverse() {
    console.log("reverse capture processing");

    const video = this.getVideo();
    const ctx = this.canvas.getContext("2d");

    ctx.save();
    ctx.scale(-1, 1);

    const sourceWidth = video.videoWidth;
    const sourceHeight = video.videoHeight;

    const sourceAspectRatio =
      sourceWidth / sourceHeight;

    let drawWidth = this.canvas.width;
    const drawHeight = this.canvas.height;

    const drawAspectRatio = drawWidth / drawHeight;

    drawWidth =
      drawWidth *
      (sourceAspectRatio / drawAspectRatio);

    ctx.translate(-drawWidth, 0);

    const drawOffsetX =
      Math.abs(drawWidth - this.canvas.width) / 2;

    ctx.drawImage(
      video,
      0,
      0,
      sourceWidth,
      sourceHeight,
      drawOffsetX,
      0,
      drawWidth,
      drawHeight
    );

    ctx.restore();
  }

  resumeVideo(video) {
    video.play();
  }

  resumeAnimatingScene(scene) {
    scene.renderer.setAnimationLoop(() =>
      scene.render()
    );
  }

  capture(options = { reverse: false }) {
    if (this.isCapturing) {
      console.log("캡쳐가 진행중입니다");
      return;
    }

    this.isCapturing = true;

    this.appendCanvasToBody();

    this.drawVideo(options);
    this.drawScene(options);

    this.exportAsBlob((blob) => {
      const captureMessage: CaptureMessageInterface = {
        type: "image-captured",
        payload: blob,
      };

      window.parent?.postMessage(captureMessage, "*");

      this.isCapturing = false;
    });
  }

  appendCanvasToBody() {
    document.body.appendChild(this.canvas);
  }

  removeCanvasFromBody() {
    document.body.removeChild(this.canvas);
  }

  exportAsBlob(callback) {
    return this.canvas.toBlob((blob) => {
      callback(blob);
    }, "image/png");
  }
}
