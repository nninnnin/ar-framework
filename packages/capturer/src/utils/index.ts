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

  captureScene(scene) {
    this.toneMappingStore = scene.renderer.toneMapping;
    this.outputEncodingStore =
      scene.renderer.outputEncoding;

    const preprocessor = (scene) => {
      scene.renderer.toneMapping = THREE.NoToneMapping;
      scene.renderer.outputEncoding =
        THREE.LinearEncoding;
    };

    const postprocessor = (scene) => {
      scene.renderer.toneMapping =
        this.toneMappingStore;
      scene.renderer.outputEncoding =
        this.outputEncodingStore;
    };

    preprocessor(scene);

    console.log(
      "has screenshotfixed component?: ",
      scene.components.screenshotfixed
    );

    let capturedScene;

    if (scene.components.screenshotfixed) {
      capturedScene =
        scene.components.screenshotfixed.getCanvas(
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

  async drawScene() {
    const scene = this.getScene();

    const capturedScene = this.captureScene(scene);

    const ctx = this.canvas.getContext("2d");
    ctx.drawImage(
      capturedScene,
      0,
      0,
      capturedScene.width,
      capturedScene.height,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  drawVideo() {
    const video = this.getVideo();
    const ctx = this.canvas.getContext("2d");

    ctx.drawImage(
      video,
      0,
      0,
      video.videoWidth,
      video.videoHeight,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  resumeVideo(video) {
    video.play();
  }

  resumeAnimatingScene(scene) {
    scene.renderer.setAnimationLoop(() =>
      scene.render()
    );
  }

  capture() {
    if (this.isCapturing) {
      console.log("캡쳐가 진행중입니다");
      return;
    }

    this.isCapturing = true;

    // this.stopAnimatingScene(this.getScene());
    // this.stopVideo(this.getVideo());

    this.drawVideo();
    this.drawScene();

    this.exportAsBlob((blob) => {
      // this.resumeVideo(this.getVideo());
      // this.resumeAnimatingScene(this.getScene());

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
