import { IpcRendererEvent, contextBridge, ipcRenderer } from "electron";

import { Settings } from "../src/hooks/use-settings";

contextBridge.exposeInMainWorld("api", {
  openSettings(): void {
    ipcRenderer.send("settings:open");
  },

  closeWindow(): void {
    ipcRenderer.send("window:close");
  },

  updateSettings(settings: Settings): void {
    ipcRenderer.send("settings:update", settings);
  },

  onSettingsChanged(listener: (settings: Settings) => void): () => void {
    const handler = (_event: IpcRendererEvent, settings: Settings): void => {
      listener(settings);
    };

    ipcRenderer.on("settings:changed", handler);

    return (): void => {
      ipcRenderer.off("settings:changed", handler);
    };
  },
});
