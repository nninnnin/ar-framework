import "./styles.css";
import { Capturer } from "./utils/index.ts";

window.addEventListener("message", async (event) => {
  const message = event.data;

  if (message.type === "trigger-capture") {
    const capturer = new Capturer();
    capturer.capture();
  }
});
