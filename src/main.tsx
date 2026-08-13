import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./components/app/app.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const reactRoot = ReactDOM.createRoot(rootElement);

reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Use contextBridge
window.ipcRenderer.on("main-process-message", (_event, message) => {
  // eslint-disable-next-line no-console
  console.log(message);
});
