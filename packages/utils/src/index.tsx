import React, {
  ForwardedRef,
  useEffect,
  useRef,
  forwardRef,
  useMemo,
} from "react";

import IframeMessenger from "./IframeMessenger";
import { MessageInterface } from "./types";

export const useArContentsMessages = ({
  handleARLoaded,
  handleCapturedImage,
  handleGifLoaded,
}: {
  handleARLoaded: () => void;
  handleCapturedImage: (capturedImage: Blob) => void;
  handleGifLoaded?: () => void;
}) => {
  useEffect(() => {
    const messageHandler = (event) => {
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

      if (message.type === "gif-loaded") {
        console.log("AR Framework: GIF 로딩 완료 🏞️");

        handleGifLoaded && handleGifLoaded();
      }
    };

    window.addEventListener("message", messageHandler);

    return () => {
      window.removeEventListener(
        "message",
        messageHandler
      );
    };
  }, [
    handleARLoaded,
    handleCapturedImage,
    handleGifLoaded,
  ]);
};

const ArContentsIframe = forwardRef(
  (
    { src }: { src: string },
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
          height: "99.9dvh",
          position: "fixed",
          top: 0,
          left: 0,
          visibility: "hidden",
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

    const messenger = new IframeMessenger(
      iframeRef.current!
    );

    messenger.postMessage({
      type: "show-glb-models",
      payload: null,
    });
  };

  const showCaptureButton = () => {
    if (!iframeRef.current) {
      throwIframeRefError();
    }

    const messenger = new IframeMessenger(
      iframeRef.current!
    );

    messenger.postMessage({
      type: "show-capture-button",
      payload: null,
    });
  };

  const triggerCapture = () => {
    const messenger = new IframeMessenger(
      iframeRef.current!
    );

    messenger.postMessage({
      type: "trigger-capture",
      payload: null,
    });
  };

  const ArContentsIframeComponent = useMemo(
    () =>
      ({
        src,
        visibility,
      }: {
        src: string;
        visibility: boolean;
      }) => {
        useEffect(() => {
          if (visibility) {
            console.log("visibility changed!");

            if (iframeRef.current) {
              iframeRef.current.style.visibility =
                "visible";
            }
          }
        }, [visibility]);

        return (
          <ArContentsIframe
            ref={iframeRef}
            src={src}
          />
        );
      },
    [iframeRef]
  );

  return {
    showGlbModels,
    showCaptureButton,
    triggerCapture,
    ArContentsIframe: ArContentsIframeComponent,
  };
};
