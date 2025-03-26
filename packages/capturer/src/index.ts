import "./styles.css";
import { Capturer } from "./utils/index.ts";

const captureButton = document.createElement("button");

captureButton.id = "capture-button";
captureButton.addEventListener("click", () => {
  const capturer = new Capturer();

  capturer.capture();
});

document.body.appendChild(captureButton);
