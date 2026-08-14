import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";

import { AppContext } from "../context/app-context.ts";
import { useLocalStorage } from "../hooks/use-local-storage.ts";
import { useScramble } from "../hooks/use-scramble.ts";
import { DEFAULT_SETTINGS, Settings } from "../types/settings.ts";

const SETTINGS_STORAGE_KEY = "scramble-ticker-settings";

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps): ReactNode {
  const [settings, storeSettings] = useLocalStorage<Settings>(
    SETTINGS_STORAGE_KEY,
    DEFAULT_SETTINGS,
  );

  const [initialSettings] = useState(settings);

  const ticker = useScramble(settings.eventId, settings.intervalSeconds);

  const updateSettings = useCallback(
    (values: Settings): void => {
      storeSettings(values);

      window.api.applySettings(values);
    },
    [storeSettings],
  );

  useEffect(() => window.api.onSettingsChange(storeSettings), [storeSettings]);

  useEffect(() => window.api.applySettings(initialSettings), [initialSettings]);

  const value = useMemo(
    () => ({ ...ticker, settings, updateSettings }),
    [ticker, settings, updateSettings],
  );

  return <AppContext value={value}>{children}</AppContext>;
}
