import { ReactNode } from "react";

import { useScramble } from "../hooks/use-scramble.ts";
import { useSettings } from "../hooks/use-settings.ts";
import { ScrambleContext } from "./scramble-context.ts";

type ScrambleProviderProps = {
  children: ReactNode;
};

export function ScrambleProvider({ children }: ScrambleProviderProps): ReactNode {
  const { settings, updateSettings } = useSettings();

  const ticker = useScramble(settings.eventId, settings.intervalSeconds);

  return (
    <ScrambleContext.Provider value={{ ...ticker, settings, updateSettings }}>
      {children}
    </ScrambleContext.Provider>
  );
}
