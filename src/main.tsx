import "./styles/global.css";
import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./components/app/index.tsx";
import { AppProvider } from "./context/app-provider.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const reactRoot = ReactDOM.createRoot(rootElement);

reactRoot.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
);
