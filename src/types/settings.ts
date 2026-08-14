import { z } from "zod";

import { EVENT_IDS } from "../constants/events.ts";

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

export const DEFAULT_SETTINGS: Settings = {
  eventId: "333",
  intervalSeconds: 10,
  alwaysOnTop: false,
};
