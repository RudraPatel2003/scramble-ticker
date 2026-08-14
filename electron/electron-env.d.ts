// oxlint-disable typescript/consistent-type-definitions
/// <reference types="vite-plugin-electron/electron-env" />

import { Screen } from "../src/context/app-context.ts";

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
      setAlwaysOnTop: (alwaysOnTop: boolean) => void;
      setScreen: (screen: Screen) => void;
    };
  }
}
