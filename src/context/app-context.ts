import { createContext, useContext } from "react";

import { ScrambleTickerContext } from "../hooks/use-scramble.ts";
import { SettingsContext } from "../hooks/use-settings.ts";

export type Screen = "scramble" | "settings";

export type AppContextValue = ScrambleTickerContext &
  SettingsContext & {
    screen: Screen;
    setScreen: (screen: Screen) => void;
  };

export const AppContext = createContext<AppContextValue | null>(null);

export function useAppContext(): AppContextValue {
  const value = useContext(AppContext);

  if (!value) {
    throw new Error("useAppContext must be used inside an AppProvider");
  }

  return value;
}
