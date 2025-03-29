import React, {
  ForwardedRef,
  useEffect,
  useRef,
  forwardRef,
} from "react";

import IframeMessenger from "./IframeMessenger";
import { MessageInterface } from "./types";

export const useArContentsMessages = ({
  handleARLoaded,
  handleCapturedImage,
}: {
  handleARLoaded: () => void;
  handleCapturedImage: (capturedImage: Blob) => void;
}) => {
  useEffect(() => {
    window.addEventListener("message", (event) => {
      const message: MessageInterface = event.data;

      console.log(
        "AR Framework 프로젝트로부터 받은 메시지 📮: ",
        message
      );

      if (message.type === "ar-loaded") {
        console.log(
          "AR Framework: AR 컨텐츠 로딩 완료 ✔️"
        );

        handleARLoaded();
      }

      if (message.type === "image-captured") {
        console.log(
          "AR Framework: 이미지 캡쳐 완료 🖼️"
        );

        handleCapturedImage(message.payload as Blob);
      }
    });
  }, []);
};

const ArContentsIframe = forwardRef(
  (
    {
      src,
      visibility,
    }: { src: string; visibility: boolean },
    ref: ForwardedRef<HTMLIFrameElement>
  ) => {
    return (
      <iframe
        ref={ref}
        id="ar-contents-frame"
        allow="camera; microphone; geolocation; accelerometer; gyroscope; magnetometer; xr-spatial-tracking; web-share"
        src={src}
        style={{
          width: "100vw",
          height: "100dvh",
          position: "fixed",
          top: 0,
          left: 0,
          visibility: visibility
            ? "visible"
            : "hidden",
        }}
      ></iframe>
    );
  }
);

const throwIframeRefError = () => {
  throw Error(
    "AR Framework utility error: iframeRef is not defined"
  );
};

export const useArContents = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(
    null
  );

  const showGlbModels = () => {
    if (!iframeRef.current) {
      throwIframeRefError();
    }

    const messanger = new IframeMessenger(
      iframeRef.current!
    );

    messanger.postMessage({
      type: "show-glb-models",
      payload: null,
    });
  };

  const showCaptureButton = () => {
    if (!iframeRef.current) {
      throwIframeRefError();
    }

    const messanger = new IframeMessenger(
      iframeRef.current!
    );

    messanger.postMessage({
      type: "show-capture-button",
      payload: null,
    });
  };

  return {
    showGlbModels,
    showCaptureButton,
    ArContentsIframe: ({
      src,
      visibility,
    }: {
      src: string;
      visibility: boolean;
    }) => {
      return (
        <ArContentsIframe
          ref={iframeRef}
          src={src}
          visibility={visibility}
        />
      );
    },
  };
};
