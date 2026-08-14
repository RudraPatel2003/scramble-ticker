import { createContext, useContext } from "react";

import { ScrambleTickerContext } from "../hooks/use-scramble.ts";
import { Settings } from "../types/settings.ts";

type AppContextValue = ScrambleTickerContext & {
  settings: Settings;
  updateSettings: (settings: Settings) => void;
};

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export function useAppContext(): AppContextValue {
  const value = useContext(AppContext);

  if (!value) {
    throw new Error("useAppContext must be used inside an AppProvider");
  }

  return value;
}
