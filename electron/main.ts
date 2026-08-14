import { BrowserWindow, BrowserWindowConstructorOptions, app, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Settings } from "../src/hooks/use-settings";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

const tickerWindowOptions: Partial<BrowserWindowConstructorOptions> = {
  frame: false,

  minWidth: 400,
  width: 600,
  maxWidth: 800,

  minHeight: 120,
  height: 120,
  maxHeight: 200,
};

const settingsWindowOptions: Partial<BrowserWindowConstructorOptions> = {
  frame: false,
  resizable: false,

  width: 320,
  height: 280,
};

let tickerWindow: BrowserWindow | null = null;
let settingsWindow: BrowserWindow | null = null;

function preloadPath(): string {
  return path.join(__dirname, "preload.mjs");
}

function loadRenderer(target: BrowserWindow, hash: string): void {
  if (VITE_DEV_SERVER_URL) {
    void target.loadURL(`${VITE_DEV_SERVER_URL}#${hash}`);
  } else {
    void target.loadFile(path.join(RENDERER_DIST, "index.html"), { hash });
  }
}

function createTickerWindow(): void {
  tickerWindow = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "icon.svg"),
    webPreferences: {
      preload: preloadPath(),
    },
    ...tickerWindowOptions,
  });

  tickerWindow.on("closed", () => {
    tickerWindow = null;
  });

  loadRenderer(tickerWindow, "");
}

function createSettingsWindow(): void {
  if (settingsWindow) {
    settingsWindow.focus();

    return;
  }

  settingsWindow = new BrowserWindow({
    webPreferences: {
      preload: preloadPath(),
    },
    ...settingsWindowOptions,
  });

  settingsWindow.on("closed", () => {
    settingsWindow = null;
  });

  loadRenderer(settingsWindow, "settings");
}

ipcMain.on("settings:open", () => {
  createSettingsWindow();
});

ipcMain.on("settings:update", (event, settings: Settings) => {
  tickerWindow?.setAlwaysOnTop(settings.alwaysOnTop === true);

  for (const target of BrowserWindow.getAllWindows()) {
    if (target.webContents.id !== event.sender.id) {
      target.webContents.send("settings:changed", settings);
    }
  }
});

ipcMain.on("window:close", (event) => {
  BrowserWindow.fromWebContents(event.sender)?.close();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createTickerWindow();
  }
});

void app.whenReady().then(createTickerWindow);
