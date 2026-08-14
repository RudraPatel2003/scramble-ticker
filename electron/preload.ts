import { contextBridge, ipcRenderer } from "electron";

import { Screen } from "../src/context/app-context";

contextBridge.exposeInMainWorld("api", {
  closeWindow(): void {
    ipcRenderer.send("window:close");
  },

  setAlwaysOnTop(alwaysOnTop: boolean): void {
    ipcRenderer.send("window:always-on-top", alwaysOnTop);
  },

  setScreen(screen: Screen): void {
    ipcRenderer.send("window:screen", screen);
  },
});
