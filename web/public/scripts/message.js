const postMessageToParent = (message) => {
  window.parent?.postMessage(message, "*");
};

const addMessageHandler = (eventHandlerMapper) => {
  window.addEventListener("message", (event) => {
    const message = event.data;
    console.log("부모로부터 메시지: ", message);

    Object.entries(eventHandlerMapper).forEach(
      ([eventName, handler]) => {
        if (message.type === eventName) {
          handler();
        }
      }
    );
  });
};
