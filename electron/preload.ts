import { IpcRendererEvent, contextBridge, ipcRenderer } from "electron";

import type { OnSettingsChangeCallback, OnSettingsChangeCleanup } from "./electron-env.d.ts";

import { Settings } from "../src/types/settings.ts";

contextBridge.exposeInMainWorld("api", {
  closeWindow(): void {
    ipcRenderer.send("window:close");
  },

  openSettings(): void {
    ipcRenderer.send("settings:open");
  },

  closeSettings(): void {
    ipcRenderer.send("settings:close");
  },

  applySettings(settings: Settings): void {
    ipcRenderer.send("settings:apply", settings);
  },

  onSettingsChange(callback: OnSettingsChangeCallback): OnSettingsChangeCleanup {
    const listener = (_event: IpcRendererEvent, settings: Settings): void => {
      callback(settings);
    };

    ipcRenderer.on("settings:changed", listener);

    return () => {
      ipcRenderer.off("settings:changed", listener);
    };
  },
});
