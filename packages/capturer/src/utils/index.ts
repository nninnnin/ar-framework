import { CaptureMessageInterface } from "../types";

export class Capturer {
  canvas: HTMLCanvasElement;
  dpr: number;

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
    const capturedScene =
      scene.components.screenshot.getCanvas(
        "perspective"
      );

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

  capture() {
    this.stopAnimatingScene(this.getScene());
    this.stopVideo(this.getVideo());

    setTimeout(() => {
      this.drawVideo();
      this.drawScene();
    }, 3000);

    this.exportAsBlob((blob) => {
      const captureMessage: CaptureMessageInterface = {
        type: "image-captured",
        payload: blob,
      };

      window.parent?.postMessage(captureMessage, "*");
    });

    // this.appendCanvasToBody();
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
