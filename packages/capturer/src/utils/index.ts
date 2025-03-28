import { CaptureMessageInterface } from "../types";

export class Capturer {
  canvas: HTMLCanvasElement;

  constructor() {
    const canvas = document.createElement("canvas");

    canvas.id = "capture-canvas";

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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

  captureScene(scene) {
    const capturedScene =
      scene.components.screenshot.getCanvas(
        "perspective"
      );

    return capturedScene;
  }

  drawScene() {
    const scene = this.getScene();
    const capturedScene = this.captureScene(scene);

    const ctx = this.canvas.getContext("2d");
    ctx.drawImage(capturedScene, 0, 0);
  }

  drawVideo() {
    const video = this.getVideo();
    this.stopVideo(video);

    const ctx = this.canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);
  }

  capture() {
    this.drawVideo();
    this.drawScene();

    this.exportAsBlob((blob) => {
      const captureMessage: CaptureMessageInterface = {
        type: "image-captured",
        payload: blob,
      };

      window.parent?.postMessage(captureMessage, "*");
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
