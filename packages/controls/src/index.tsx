import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

const REACT_ROOT_DOM_ID = "ar-controls-root";

const rootDOM = document.getElementById(
  REACT_ROOT_DOM_ID
);

if (!rootDOM) {
  throw new Error(
    `${REACT_ROOT_DOM_ID} 라는 id를 가진 DOM을 찾을 수 없습니다! HTML 템플릿을 확인해주세요.`
  );
}

const root = createRoot(rootDOM);
root.render(<App />);
