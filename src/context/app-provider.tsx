import { ReactNode, useEffect, useState } from "react";

import { useScramble } from "../hooks/use-scramble.ts";
import { useSettings } from "../hooks/use-settings.ts";
import { AppContext, Screen } from "./app-context.ts";

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps): ReactNode {
  const [screen, setScreen] = useState<Screen>("scramble");

  const { settings, updateSettings } = useSettings();

  const ticker = useScramble(settings.eventId, settings.intervalSeconds);

  useEffect(() => {
    window.api.setScreen(screen);
  }, [screen]);

  return (
    <AppContext.Provider value={{ ...ticker, screen, setScreen, settings, updateSettings }}>
      {children}
    </AppContext.Provider>
  );
}
