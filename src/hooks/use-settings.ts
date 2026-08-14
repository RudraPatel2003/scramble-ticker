import { useEffect, useState } from "react";
import { z } from "zod";

import { EVENT_IDS } from "../constants/events.ts";

const STORAGE_KEY = "scramble-ticker-settings";

export const MINIMUM_INTERVAL_SECONDS = 1;

export const MAXIMUM_INTERVAL_SECONDS = 300;

const INTERVAL_ERROR = `Enter a whole number from ${MINIMUM_INTERVAL_SECONDS} to ${MAXIMUM_INTERVAL_SECONDS}`;

export const settingsSchema = z.object({
  eventId: z.enum(EVENT_IDS, { error: "Pick an event" }),
  intervalSeconds: z
    .int({ error: INTERVAL_ERROR })
    .min(MINIMUM_INTERVAL_SECONDS, { error: INTERVAL_ERROR })
    .max(MAXIMUM_INTERVAL_SECONDS, { error: INTERVAL_ERROR }),
  alwaysOnTop: z.boolean(),
});

export type Settings = z.infer<typeof settingsSchema>;

const DEFAULT_SETTINGS: Settings = {
  eventId: "333",
  intervalSeconds: 10,
  alwaysOnTop: false,
};

export type SettingsContext = {
  settings: Settings;
  updateSettings: (changes: Partial<Settings>) => void;
};

function parseJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function readStoredSettings(): Settings {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return DEFAULT_SETTINGS;
  }

  const parsed = settingsSchema.safeParse(parseJson(stored));

  if (!parsed.success) {
    return DEFAULT_SETTINGS;
  }

  return parsed.data;
}

export function useSettings(): SettingsContext {
  const [settings, setSettings] = useState(readStoredSettings);

  function updateSettings(changes: Partial<Settings>): void {
    const updated = { ...settings, ...changes };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    window.api.updateSettings(updated);

    setSettings(updated);
  }

  useEffect(() => {
    window.api.updateSettings(readStoredSettings());
  }, []);

  useEffect(() => {
    return window.api.onSettingsChanged((incoming) => {
      const parsed = settingsSchema.safeParse(incoming);

      if (!parsed.success) {
        return;
      }

      setSettings(parsed.data);
    });
  }, []);

  return { settings, updateSettings };
}
