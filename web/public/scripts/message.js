const postMessageToParent = (message) => {
  window.parent?.postMessage(message, "*");
};

const addMessageHandler = (eventHandlerMapper) => {
  window.addEventListener("message", (event) => {
    const message = event.data;
    console.log(
      "AR Framework 프로젝트가 메시지를 받았습니다 📬: ",
      message
    );

    Object.entries(eventHandlerMapper).forEach(
      ([eventName, handler]) => {
        if (message.type === eventName) {
          handler();
        }
      }
    );
  });
};
