import "./styles.css";
import { Capturer } from "./utils/index.ts";

window.addEventListener("message", async (event) => {
  const message = event.data;

  const capturer = new Capturer();

  if (message.type === "trigger-capture") {
    capturer.capture();
  }
});
