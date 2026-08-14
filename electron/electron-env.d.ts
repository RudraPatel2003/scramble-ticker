// oxlint-disable typescript/consistent-type-definitions
/// <reference types="vite-plugin-electron/electron-env" />

import { Settings } from "../src/types/settings.ts";

type OnSettingsChangeCallback = (settings: Settings) => void;
type OnSettingsChangeCleanup = () => void;

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ROOT: string;
      VITE_PUBLIC: string;
    }
  }

  interface Window {
    api: {
      closeWindow: () => void;

      openSettings: () => void;
      closeSettings: () => void;

      applySettings: (settings: Settings) => void;
      onSettingsChange: (callback: OnSettingsChangeCallback) => OnSettingsChangeCleanup;
    };
  }
}
