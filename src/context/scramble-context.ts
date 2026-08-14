import { createContext, useContext } from "react";

import { ScrambleTickerContext } from "../hooks/use-scramble.ts";
import { SettingsContext } from "../hooks/use-settings.ts";

export type ScrambleContextValue = ScrambleTickerContext & SettingsContext;

export const ScrambleContext = createContext<ScrambleContextValue | null>(null);

export function useScrambleContext(): ScrambleContextValue {
  const value = useContext(ScrambleContext);

  if (!value) {
    throw new Error("useScrambleContext must be used inside a ScrambleProvider");
  }

  return value;
}
