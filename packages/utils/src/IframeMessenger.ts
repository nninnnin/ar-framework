import { MessageInterface } from "./types";

export default class IframeMessenger {
  private iframeElement: HTMLIFrameElement;

  constructor(iframe: HTMLIFrameElement) {
    this.iframeElement = iframe;
  }

  throwContentWindowError() {
    throw Error(
      "AR Framework utility error: contentWindow is not defined"
    );
  }

  postMessage(message: MessageInterface) {
    if (this.iframeElement.contentWindow === null) {
      this.throwContentWindowError();
    }

    this.iframeElement.contentWindow!.postMessage(
      message,
      "*"
    );
  }
}
