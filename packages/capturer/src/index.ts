import "./styles.css";
import { Capturer } from "./utils/index.ts";

const captureButton = document.createElement("button");
captureButton.id = "capture-button";

let isCapturing = false;

captureButton.addEventListener("click", async () => {
  if (isCapturing) {
    console.log("캡쳐가 진행중입니다");
    return;
  }

  isCapturing = true;

  const capturer = new Capturer();
  capturer.capture(() => {
    isCapturing = false;
  });
});

document.body.appendChild(captureButton);
