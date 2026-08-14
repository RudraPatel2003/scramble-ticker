import "../styles/global.css";
import React from "react";
import ReactDOM from "react-dom/client";

import { Settings } from "../components/settings/index.tsx";
import { AppProvider } from "../providers/app-provider.tsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const reactRoot = ReactDOM.createRoot(rootElement);

reactRoot.render(
  <React.StrictMode>
    <AppProvider>
      <Settings />
    </AppProvider>
  </React.StrictMode>,
);
