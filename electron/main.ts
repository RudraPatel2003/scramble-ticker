import { BrowserWindow, BrowserWindowConstructorOptions, app } from "electron";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const _require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, "..");

export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let window: BrowserWindow | null;

const windowOptions: Partial<BrowserWindowConstructorOptions> = {
  minWidth: 400,
  width: 600,
  maxWidth: 800,
  minHeight: 100,
  height: 100,
  maxHeight: 200,
};

function createWindow(): void {
  window = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "icon.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
    ...windowOptions,
  });

  // Test active push message to Renderer-process.
  window.webContents.on("did-finish-load", () => {
    window?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    void window.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    void window.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();

    window = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

void app.whenReady().then(createWindow);
