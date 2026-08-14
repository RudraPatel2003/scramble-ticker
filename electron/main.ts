import { BrowserWindow, BrowserWindowConstructorOptions, app, ipcMain, screen } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { DEFAULT_SETTINGS, settingsSchema } from "../src/types/settings.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

const SURFACE_COLOR = "#212121";

const DEVELOPMENT_ICON = path.join(process.env.APP_ROOT, "build", "icon.png");

const TICKER_SCREEN = "src/screens/index.html";
const SETTINGS_SCREEN = "src/screens/settings.html";

const TICKER_WINDOW_HEIGHT = 160;

const SETTINGS_WINDOW_WIDTH = 440;
const SETTINGS_WINDOW_HEIGHT = 456;

const tickerWindowOptions: Partial<BrowserWindowConstructorOptions> = {
  frame: false,
  backgroundColor: SURFACE_COLOR,

  minWidth: 400,
  width: 600,
  maxWidth: 800,

  minHeight: TICKER_WINDOW_HEIGHT,
  height: TICKER_WINDOW_HEIGHT,
  maxHeight: TICKER_WINDOW_HEIGHT,
};

const settingsWindowOptions: Partial<BrowserWindowConstructorOptions> = {
  title: "Settings",
  backgroundColor: SURFACE_COLOR,
  resizable: false,
  minimizable: false,
  maximizable: false,
  fullscreenable: false,

  width: SETTINGS_WINDOW_WIDTH,
  height: SETTINGS_WINDOW_HEIGHT,
};

let tickerWindow: BrowserWindow | undefined = undefined;
let settingsWindow: BrowserWindow | undefined = undefined;

function loadRenderer(window: BrowserWindow, htmlFileName: string): void {
  if (VITE_DEV_SERVER_URL) {
    void window.loadURL(new URL(htmlFileName, VITE_DEV_SERVER_URL).href);
    return;
  }

  void window.loadFile(path.join(RENDERER_DIST, htmlFileName));
}

function createTickerWindow(): void {
  tickerWindow = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "icon.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
    alwaysOnTop: DEFAULT_SETTINGS.alwaysOnTop,
    ...tickerWindowOptions,
  });

  tickerWindow.on("closed", () => {
    tickerWindow = undefined;
  });

  loadRenderer(tickerWindow, TICKER_SCREEN);
}

function getSettingsWindowPosition(): { x: number; y: number } | undefined {
  if (!tickerWindow) {
    return undefined;
  }

  const { workArea } = screen.getDisplayMatching(tickerWindow.getBounds());

  return {
    x: Math.round(workArea.x + (workArea.width - SETTINGS_WINDOW_WIDTH) / 2),
    y: Math.round(workArea.y + (workArea.height - SETTINGS_WINDOW_HEIGHT) / 2),
  };
}

function createSettingsWindow(): void {
  if (settingsWindow) {
    settingsWindow.show();
    settingsWindow.focus();
    return;
  }

  settingsWindow = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "icon.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
    ...settingsWindowOptions,
    ...getSettingsWindowPosition(),
  });

  settingsWindow.on("closed", () => {
    settingsWindow = undefined;
  });

  loadRenderer(settingsWindow, SETTINGS_SCREEN);
}

ipcMain.on("settings:open", () => {
  createSettingsWindow();
});

ipcMain.on("settings:apply", (event, settings: unknown) => {
  const result = settingsSchema.safeParse(settings);

  if (!result.success) {
    return;
  }

  tickerWindow?.setAlwaysOnTop(result.data.alwaysOnTop);

  for (const window of BrowserWindow.getAllWindows()) {
    if (window.webContents.id !== event.sender.id) {
      window.webContents.send("settings:changed", result.data);
    }
  }
});

ipcMain.on("settings:close", () => {
  settingsWindow?.close();
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
  if (!tickerWindow) {
    createTickerWindow();
    return;
  }

  tickerWindow.show();
});

void app.whenReady().then(() => {
  if (VITE_DEV_SERVER_URL && process.platform === "darwin") {
    app.dock?.setIcon(DEVELOPMENT_ICON);
  }

  createTickerWindow();
});
