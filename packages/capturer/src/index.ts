import "./styles.css";
import { Capturer } from "./utils/index.ts";

const captureButton = document.createElement("button");
captureButton.id = "capture-button";

const capturer = new Capturer();

captureButton.addEventListener("click", async () => {
  capturer.capture();
});

document.body.appendChild(captureButton);
