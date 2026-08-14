import { BrowserWindow, BrowserWindowConstructorOptions, app, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Screen } from "../src/context/app-context";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

const SCREEN_HEIGHTS: Record<Screen, number> = {
  scramble: 120,
  settings: 280,
};

const tickerWindowOptions: Partial<BrowserWindowConstructorOptions> = {
  frame: false,

  minWidth: 400,
  width: 600,
  maxWidth: 800,

  minHeight: SCREEN_HEIGHTS.scramble,
  height: SCREEN_HEIGHTS.scramble,
  maxHeight: SCREEN_HEIGHTS.settings,
};

function createTickerWindow(): void {
  const tickerWindow = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "icon.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
    ...tickerWindowOptions,
  });

  if (VITE_DEV_SERVER_URL) {
    void tickerWindow.loadURL(VITE_DEV_SERVER_URL);
  } else {
    void tickerWindow.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

ipcMain.on("window:always-on-top", (event, alwaysOnTop: boolean) => {
  BrowserWindow.fromWebContents(event.sender)?.setAlwaysOnTop(alwaysOnTop);
});

ipcMain.on("window:screen", (event, screen: Screen) => {
  const target = BrowserWindow.fromWebContents(event.sender);

  if (!target) {
    return;
  }

  const [width] = target.getSize();

  target.setSize(width, SCREEN_HEIGHTS[screen], true);
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
