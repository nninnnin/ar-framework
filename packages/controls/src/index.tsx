import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

function addRootElement() {
  const REACT_ROOT_DOM_ID = "ar-controls-root";

  const rootDOM = document.createElement("div");
  rootDOM.id = REACT_ROOT_DOM_ID;

  document.body.appendChild(rootDOM);

  return rootDOM;
}

(function main() {
  const rootDOM = addRootElement();
  const reactRoot = createRoot(rootDOM);

  reactRoot.render(<App />);
})();
