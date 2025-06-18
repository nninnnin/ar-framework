import "./styles.css";
import { Capturer } from "./utils/index.ts";

window.addEventListener("message", async (event) => {
  const message = event.data;

  const capturer = new Capturer();

  if (message.type === "trigger-capture") {
    const isFaceCapture =
      message.payload &&
      message.payload.captureType === "face";

    const appendCanvas =
      message.payload.appendCanvas || false;

    if (isFaceCapture) {
      capturer.capture({
        reverse: true,
        appendCanvas,
      });

      return;
    }

    capturer.capture({
      reverse: false,
      appendCanvas,
    });
  }
});
