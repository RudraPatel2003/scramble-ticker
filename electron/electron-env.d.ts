// oxlint-disable typescript/consistent-type-definitions
/// <reference types="vite-plugin-electron/electron-env" />

import { Settings } from "../src/hooks/use-settings.ts";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ROOT: string;
      VITE_PUBLIC: string;
    }
  }

  interface Window {
    api: {
      openSettings: () => void;
      closeWindow: () => void;
      updateSettings: (settings: Settings) => void;
      onSettingsChanged: (listener: (settings: unknown) => void) => () => void;
    };
  }
}
